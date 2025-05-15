import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FORM_QUERY_KEY, queryClient } from "./formConfig";
import "./App.css";

function SummaryPage() {
  const formData = queryClient.getQueryData(FORM_QUERY_KEY) || {};
  const navigate = useNavigate();
  const handleSubmit = () => {
    alert("Kárbejelentés elküldve!\n" + JSON.stringify(formData, null, 2));
    queryClient.removeQueries(FORM_QUERY_KEY);
    navigate("/");
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
          Összegzés
        </Typography>
      </Box>
      <Box component="dl" sx={{ mb: 2, px: 1 }}>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            Név:
          </Typography>
          <Typography component="dd">{formData.name}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            Email:
          </Typography>
          <Typography component="dd">{formData.email}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            Telefonszám:
          </Typography>
          <Typography component="dd">{formData.phone}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            Eszközszám:
          </Typography>
          <Typography component="dd">{formData.deviceNumber}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            Biztosítási szám:
          </Typography>
          <Typography component="dd">{formData.insuranceNumber}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            Lakhely:
          </Typography>
          <Typography component="dd">{formData.city}</Typography>
        </Box>
        <Box className="summary-row">
          <Typography component="dt" fontWeight="bold" color="primary.main">
            Születési dátum:
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
          onClick={() => navigate("/step2")}
        >
          Vissza
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          className="fancy-btn"
          onClick={handleSubmit}
        >
          Véglegesítés
        </Button>
      </Box>
    </Box>
  );
}

export default SummaryPage;
