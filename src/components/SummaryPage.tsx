import { Box, Button, Typography } from "@mui/material";
import { UserData } from "../formConfig";
import useFormStore from "../store/formStore";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { validateIBAN } from "../utils/ibanValidation";
import axios from "../lib/axios";
import "../App.css";
import { isSessionValid } from "../utils/sessionManager";
import { useEffect } from "react";

function SummaryPage() {
  const { t } = useTranslation();
  const router = useRouter();
  // Ellenőrizzük, hogy van-e bejelentkezett user

  useEffect(() => {
    if (!isSessionValid()) {
      router.navigate({ to: "/login" });
    }
  }, [router]);
  const { formData, resetForm } = useFormStore();
  const handleSubmit = async () => {
    // Az összes adatot egyesítjük (step1 + step2)
    const allData = { ...formData.step1, ...formData.step2 } as UserData;
    // Ellenőrizzük az IBAN-t a végleges beküldés előtt
    const ibanValidation = validateIBAN(allData.iban);
    if (!ibanValidation.isValid) {
      alert(ibanValidation.error);
      return;
    }

    // birthDate-t formázzuk ISO helyett magyar vagy angol formátumra
    const formattedData = {
      ...allData,
      birthDate: allData.birthDate
        ? new Date(allData.birthDate).toLocaleDateString(
            navigator.language === "en" ? "en-GB" : "hu-HU"
          )
        : "",
    };

    // Axios GET példa: lekérünk egy publikus user-t
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      alert(
        t("form.summary.successMessage") +
          "\n" +
          JSON.stringify(formattedData, null, 2) +
          "\n---\n" +
          "Publikus user (Axios GET):\n" +
          JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      alert(
        "Axios GET hiba: " + (err instanceof Error ? err.message : String(err))
      );
    }

    resetForm();
    router.navigate({ to: "/step1" });
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
          <Typography component="dd">{formData.step1?.name}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.email")}:
          </Typography>
          <Typography component="dd">{formData.step1?.email}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.phone")}:
          </Typography>
          <Typography component="dd">{formData.step1?.phone}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.imeiNumber")}:
          </Typography>
          <Typography component="dd">{formData.step2?.imeiNumber}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.insuranceNumber")}:
          </Typography>
          <Typography component="dd">
            {formData.step2?.insuranceNumber}
          </Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.city")}:
          </Typography>
          <Typography component="dd">{formData.step2?.city}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.birthDate")}:
          </Typography>
          <Typography component="dd">
            {formData.step2?.birthDate
              ? new Date(formData.step2.birthDate).toLocaleDateString()
              : ""}
          </Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            {t("form.summary.iban")}:
          </Typography>
          <Typography component="dd">{formData.step2?.iban}</Typography>
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
