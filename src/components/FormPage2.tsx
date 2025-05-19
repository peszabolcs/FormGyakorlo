import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  LocationCity,
  Devices,
  Numbers,
  AccountBalance,
} from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { validationSchemas, UserData } from "../formConfig";
import { useCities, useCardTypes } from "../query/mockApi";
import useFormStore from "../store/formStore";
import { useEffect } from "react";
import { isSessionValid } from "../utils/sessionManager";
import "../App.css";

function FormPage2() {
  const { t } = useTranslation();
  const { formData, setStep2Data } = useFormStore();
  const router = useRouter();
  const { data: cities = [], isLoading: citiesLoading } = useCities();
  const { data: cardTypes = [], isLoading: cardTypesLoading } = useCardTypes();

  useEffect(() => {
    if (!isSessionValid()) {
      router.navigate({ to: "/login" });
    }
  }, [router]);

  const formik = useFormik<
    Pick<
      UserData,
      | "imeiNumber"
      | "insuranceNumber"
      | "city"
      | "birthDate"
      | "iban"
      | "cardType"
    >
  >({
    initialValues: {
      imeiNumber: formData.step2?.imeiNumber || "",
      insuranceNumber: formData.step2?.insuranceNumber || "",
      city: formData.step2?.city || "",
      birthDate: formData.step2?.birthDate
        ? new Date(formData.step2.birthDate)
        : null,
      iban: formData.step2?.iban || "",
      cardType: formData.step2?.cardType || "",
    },
    validationSchema: toFormikValidationSchema(validationSchemas.page2),
    onSubmit: (values) => {
      setStep2Data(values);
      router.navigate({ to: "/summary" });
    },
  });
  return (
    <Box
      className="card fancy-card"
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 4,
        boxShadow: 6,
        background: "rgba(255,255,255,0.95)",
        position: "relative",
      }}
    >
      <Box
        className="card-header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          py: 1.5,
          borderRadius: 3,
          background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          boxShadow: 2,
        }}
      >
        <LocationCity sx={{ mr: 1 }} />
        <Typography variant="h5" align="center" fontWeight={700}>
          {t("form.title")}
        </Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            id="imeiNumber"
            name="imeiNumber"
            label={t("form.deviceNumber")}
            variant="outlined"
            value={formik.values.imeiNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.imeiNumber && Boolean(formik.errors.imeiNumber)
            }
            helperText={formik.touched.imeiNumber && formik.errors.imeiNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Devices />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="insuranceNumber"
            name="insuranceNumber"
            label={t("form.insuranceNumber")}
            variant="outlined"
            value={formik.values.insuranceNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.insuranceNumber &&
              Boolean(formik.errors.insuranceNumber)
            }
            helperText={
              formik.touched.insuranceNumber && formik.errors.insuranceNumber
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Numbers />
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="city-label">{t("form.city")}</InputLabel>
            <Select
              labelId="city-label"
              id="city"
              name="city"
              value={formik.values.city}
              label={t("form.city")}
              onChange={(e) => {
                formik.handleChange(e);
                setStep2Data({ ...formik.values, city: e.target.value });
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              disabled={citiesLoading}
            >
              <MenuItem value="">
                <em>{t("form.selectCity")}</em>
              </MenuItem>
              {cities.map((city: any) => (
                <MenuItem key={city.code} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.city && formik.errors.city && (
              <Typography color="error" variant="caption">
                {formik.errors.city}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="cardType-label">{t("form.cardType")}</InputLabel>
            <Select
              labelId="cardType-label"
              id="cardType"
              name="cardType"
              value={formik.values.cardType}
              label={t("form.cardType")}
              onChange={(e) => {
                formik.handleChange(e);
                setStep2Data({ ...formik.values, cardType: e.target.value });
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.cardType && Boolean(formik.errors.cardType)}
              disabled={cardTypesLoading}
            >
              <MenuItem value="">
                <em>{t("form.selectCardType")}</em>
              </MenuItem>
              {cardTypes.map((type: any) => (
                <MenuItem key={type.code} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.cardType && formik.errors.cardType && (
              <Typography color="error" variant="caption">
                {formik.errors.cardType}
              </Typography>
            )}
          </FormControl>
          <DatePicker
            label={t("form.birthDate")}
            value={formik.values.birthDate}
            onChange={(value) => formik.setFieldValue("birthDate", value)}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                id: "birthDate",
                name: "birthDate",
                error:
                  formik.touched.birthDate && Boolean(formik.errors.birthDate),
                helperText: formik.touched.birthDate && formik.errors.birthDate,
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Numbers />
                    </InputAdornment>
                  ),
                },
                onBlur: formik.handleBlur,
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="iban"
            name="iban"
            label={t("form.iban")}
            variant="outlined"
            value={formik.values.iban}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.iban && Boolean(formik.errors.iban)}
            helperText={formik.touched.iban && formik.errors.iban}
            placeholder="HU12345678901234567890123456"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalance />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className="fancy-btn"
              onClick={() => router.navigate({ to: "/step1" })}
            >
              {t("form.buttons.back")}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className="fancy-btn"
            >
              {t("form.buttons.next")}
            </Button>
          </Box>
        </form>
      </LocalizationProvider>
    </Box>
  );
}

export default FormPage2;
