import { Box, Button, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { FORM_QUERY_KEY, queryClient, UserData } from "../formConfig";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import "../App.css";

function SummaryPage() {
  const { t } = useTranslation();
  const router = useRouter();
  // Ellenőrizzük, hogy van-e bejelentkezett user
  const user = queryClient.getQueryData(["user"]);
  if (!user) {
    router.navigate({ to: "/login" });
    return null;
  }
  const formData =
    (queryClient.getQueryData(FORM_QUERY_KEY) as UserData) || ({} as UserData);
  const handleSubmit = () => {
    alert(
      t("form.summary.successMessage") +
        "\n" +
        JSON.stringify(formData, null, 2)
    );
    queryClient.removeQueries({ queryKey: FORM_QUERY_KEY });
    router.navigate({ to: "/" });
  };
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
        <Typography variant="h5" align="center" fontWeight={700}>
          {t("form.summary.title")}
        </Typography>
      </Box>
      <Box component="dl" sx={{ mb: 2, px: 1 }}>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.name")}:
          </Typography>
          <Typography component="dd">{formData.name}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.email")}:
          </Typography>
          <Typography component="dd">{formData.email}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.phone")}:
          </Typography>
          <Typography component="dd">{formData.phone}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.deviceNumber")}:
          </Typography>
          <Typography component="dd">{formData.deviceNumber}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.insuranceNumber")}:
          </Typography>
          <Typography component="dd">{formData.insuranceNumber}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.city")}:
          </Typography>
          <Typography component="dd">{formData.city}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.birthDate")}:
          </Typography>
          <Typography component="dd">
            {formData.birthDate
              ? new Date(formData.birthDate).toLocaleDateString()
              : ""}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          className="fancy-btn"
          onClick={() => router.navigate({ to: "/step2" })}
        >
          {t("form.buttons.back")}
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          className="fancy-btn"
          onClick={handleSubmit}
        >
          {t("form.buttons.submit")}
        </Button>
      </Box>
    </Box>
  );
}

export default SummaryPage;
