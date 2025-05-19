import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { validationSchemas, mockLoginApi } from "../formConfig";
import type { LoginFormValues } from "../formConfig";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createSession } from "../utils/sessionManager";
import { useRouter } from "@tanstack/react-router";

export const LoginPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: mockLoginApi,
    onSuccess: (data) => {
      createSession(data.token, data.user);
      router.navigate({ to: "/step1" });
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(validationSchemas.login),
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <Box>
      <LanguageSwitcher />
      <Card sx={{ minWidth: 350, boxShadow: 6, borderRadius: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            fontWeight={700}
            mb={2}
            color="primary"
          >
            {t("form.login.title")}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label={t("form.login.username")}
              variant="outlined"
              fullWidth
              margin="normal"
              name="username"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              autoFocus
            />
            <TextField
              label={t("form.login.password")}
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ mt: 2, borderRadius: 2 }}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending
                ? t("form.login.button") + "..."
                : t("form.login.button")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
