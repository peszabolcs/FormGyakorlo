import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Email, Phone, Numbers, Devices } from "@mui/icons-material";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { validationSchemas, UserData } from "../formConfig";
import useFormStore from "../store/formStore";
import { useEffect } from "react";
import { isSessionValid } from "../utils/sessionManager";
import "../App.css";

function FormPage1() {
  const { t } = useTranslation();
  const { formData, setStep1Data } = useFormStore();
  const router = useRouter();

  useEffect(() => {
    if (!isSessionValid()) {
      router.navigate({ to: "/login" });
    }
  }, [router]);

  const formik = useFormik<Pick<UserData, "name" | "email" | "phone">>({
    initialValues: {
      name: formData.step1?.name || "",
      email: formData.step1?.email || "",
      phone: formData.step1?.phone || "",
    },
    validationSchema: toFormikValidationSchema(validationSchemas.page1),
    onSubmit: (values) => {
      setStep1Data(values);
      router.navigate({ to: "/step2" });
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
        <Devices sx={{ mr: 1 }} />
        <Typography variant="h5" align="center" fontWeight={700}>
          {t("form.page1.title")}
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label={t("form.page1.name")}
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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
          id="email"
          name="email"
          label={t("form.page1.email")}
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          id="phone"
          name="phone"
          label={t("form.page1.phone")}
          variant="outlined"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          placeholder="+36301234567"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
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
    </Box>
  );
}

export default FormPage1;
