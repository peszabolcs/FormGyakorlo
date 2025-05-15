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
import {
  FORM_QUERY_KEY,
  queryClient,
  page1ValidationSchema,
} from "../formConfig";
import "../App.css";

function FormPage1() {
  const formData = queryClient.getQueryData(FORM_QUERY_KEY) || {};
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
    },
    validationSchema: toFormikValidationSchema(page1ValidationSchema),
    onSubmit: (values) => {
      queryClient.setQueryData(FORM_QUERY_KEY, { ...formData, ...values });
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
          Alap adatok
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Név"
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
          label="Email"
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
          label="Telefonszám"
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
            Tovább
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default FormPage1;
