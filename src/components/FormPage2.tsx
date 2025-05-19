import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
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
import {
  FORM_QUERY_KEY,
  queryClient,
  validationSchemas,
  UserData,
} from "../formConfig";
import { useEffect } from "react";
import { isSessionValid } from "../utils/sessionManager";
import "../App.css";

function FormPage2() {
  const { t } = useTranslation();
  const formData =
    (queryClient.getQueryData(FORM_QUERY_KEY) as UserData) || ({} as UserData);
  const router = useRouter();

  useEffect(() => {
    if (!isSessionValid()) {
      router.navigate({ to: "/login" });
    }
  }, [router]);

  const formik = useFormik<
    Pick<
      UserData,
      "imeiNumber" | "insuranceNumber" | "city" | "birthDate" | "iban"
    >
  >({
    initialValues: {
      imeiNumber: formData.imeiNumber || "",
      insuranceNumber: formData.insuranceNumber || "",
      city: formData.city || "",
      birthDate: formData.birthDate ? new Date(formData.birthDate) : null,
      iban: formData.iban || "",
    },
    validationSchema: toFormikValidationSchema(validationSchemas.page2),
    onSubmit: (values) => {
      const newUser: UserData = {
        ...formData,
        ...values,
      };
      queryClient.setQueryData(FORM_QUERY_KEY, newUser);
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
          <TextField
            fullWidth
            margin="normal"
            id="city"
            name="city"
            label={t("form.city")}
            variant="outlined"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationCity />
                </InputAdornment>
              ),
            }}
          />
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
              onClick={() => {
                queryClient.setQueryData(FORM_QUERY_KEY, {
                  ...formData,
                  ...formik.values,
                });
                router.navigate({ to: "/" });
              }}
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
