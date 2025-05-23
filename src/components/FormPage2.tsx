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
  CircularProgress,
  Alert,
  Snackbar,
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
import { useParallelQueries, DataItem } from "../query/mockApi";
import useFormStore from "../store/formStore";
import { useEffect, useState } from "react";
import { isSessionValid } from "../utils/sessionManager";
import "../App.css";

function FormPage2() {
  const { t } = useTranslation();
  const { formData, setStep2Data } = useFormStore();
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // Use the parallel queries hook with 4 parallel queries (can be between 2-5)
  const {
    cities = [],
    damageTypes = [],
    phoneBrands = [],
    insuranceTypes = [],
    status,
  } = useParallelQueries(4);
  const { isLoading, isError, isSuccess, errorMessage } = status;

  useEffect(() => {
    if (!isSessionValid()) {
      router.navigate({ to: "/login" });
    }
  }, [router]);

  // Effect to handle the success status of all API requests
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      // Hide success message after 3 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const formik = useFormik<
    Pick<
      UserData,
      | "imeiNumber"
      | "insuranceNumber"
      | "city"
      | "birthDate"
      | "iban"
      | "damageType"
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
      damageType: formData.step2?.damageType || "",
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
      {" "}
      {/* Success message notification */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          All API requests completed successfully (200 OK)
        </Alert>
      </Snackbar>
      {/* Error message notification */}
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage || "An error occurred while fetching data"}
        </Alert>
      </Snackbar>
      {/* Global loading indicator */}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
          }}
        >
          <CircularProgress size={24} color="primary" />
        </Box>
      )}
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
              disabled={isLoading}
              endAdornment={
                isLoading ? (
                  <InputAdornment position="end">
                    <CircularProgress size={20} />
                  </InputAdornment>
                ) : null
              }
            >
              <MenuItem value="">
                <em>{t("form.selectCity")}</em>
              </MenuItem>{" "}
              {cities.map((city: DataItem) => (
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
            <InputLabel id="damageType-label">
              {t("form.damageType")}
            </InputLabel>
            <Select
              labelId="damageType-label"
              id="damageType"
              name="damageType"
              value={formik.values.damageType}
              label={t("form.damageType")}
              onChange={(e) => {
                formik.handleChange(e);
                setStep2Data({ ...formik.values, damageType: e.target.value });
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.damageType && Boolean(formik.errors.damageType)
              }
              disabled={isLoading}
              endAdornment={
                isLoading ? (
                  <InputAdornment position="end">
                    <CircularProgress size={20} />
                  </InputAdornment>
                ) : null
              }
            >
              <MenuItem value="">
                <em>{t("form.selectDamageType")}</em>
              </MenuItem>{" "}
              {damageTypes.map((type: DataItem) => (
                <MenuItem key={type.code} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.damageType && formik.errors.damageType && (
              <Typography color="error" variant="caption">
                {formik.errors.damageType}
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
          />{" "}
          {/* Additional data from parallel queries (for demonstration) */}
          <Box
            sx={{
              mt: 3,
              mb: 2,
              p: 2,
              border: "1px dashed #ccc",
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" mb={1}>
              Additional data loaded in parallel:
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {" "}
              {phoneBrands.length > 0 && (
                <Box sx={{ flex: "1 1 45%" }}>
                  <Typography variant="caption" color="primary">
                    Phone Brands:
                  </Typography>
                  <Typography variant="body2">
                    {phoneBrands
                      .map((brand: DataItem) => brand.name)
                      .join(", ")}
                  </Typography>
                </Box>
              )}
              {insuranceTypes.length > 0 && (
                <Box sx={{ flex: "1 1 45%" }}>
                  <Typography variant="caption" color="primary">
                    Insurance Types:
                  </Typography>
                  <Typography variant="body2">
                    {insuranceTypes
                      .map((type: DataItem) => type.name)
                      .join(", ")}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
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
