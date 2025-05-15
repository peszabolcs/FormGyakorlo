import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LocationCity,
  Devices,
  Numbers,
} from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
// import { useNavigate } from "react-router-dom";
import {
  FORM_QUERY_KEY,
  queryClient,
  page2ValidationSchema,
} from "./formConfig";
import "./App.css";

function FormPage2() {
  const formData = queryClient.getQueryData(FORM_QUERY_KEY) || {};
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      deviceNumber: formData.deviceNumber || "",
      insuranceNumber: formData.insuranceNumber || "",
      city: formData.city || "",
      password: formData.password || "",
      birthDate: formData.birthDate || null,
    },
    validationSchema: toFormikValidationSchema(page2ValidationSchema),
    onSubmit: (values) => {
      queryClient.setQueryData(FORM_QUERY_KEY, { ...formData, ...values });
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
          Kár részletei
        </Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            id="deviceNumber"
            name="deviceNumber"
            label="Eszközszám"
            variant="outlined"
            value={formik.values.deviceNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.deviceNumber && Boolean(formik.errors.deviceNumber)
            }
            helperText={
              formik.touched.deviceNumber && formik.errors.deviceNumber
            }
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
            label="Biztosítási szám"
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
            label="Lakhely"
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
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Jelszó"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Visibility />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="jelszó mutatása/elrejtése"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <DatePicker
            label="Születési dátum"
            value={formik.values.birthDate}
            onChange={(value) => formik.setFieldValue("birthDate", value)}
            onBlur={formik.handleBlur}
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
              },
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
              Vissza
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className="fancy-btn"
            >
              Tovább
            </Button>
          </Box>
        </form>
      </LocalizationProvider>
    </Box>
  );
}

export default FormPage2;
