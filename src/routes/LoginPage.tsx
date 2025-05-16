import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useMockUser } from "../hooks/useMockUser";
import { useRouter } from "@tanstack/react-router";
import { queryClient } from "../formConfig";

function LoginPage() {
  const [userId, setUserId] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const { data, isLoading, isError } = useMockUser(userId);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isLoading && data && !isError) {
      queryClient.setQueryData(["user"], data);
      router.navigate({ to: "/step1" });
    }
  };

  return (
    <Box
      className="card fancy-card"
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 4,
        boxShadow: 6,
        background: "rgba(255,255,255,0.95)",
      }}
    >
      <Typography variant="h5" align="center" fontWeight={700} mb={2}>
        Bejelentkezés
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Felhasználó ID (1-10)"
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          inputProps={{ min: 1, max: 10 }}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Bejelentkezés
        </Button>
      </form>
      {submitted && isLoading && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Betöltés...
        </Alert>
      )}
      {submitted && isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Hibás felhasználó ID!
        </Alert>
      )}
    </Box>
  );
}

export default LoginPage;
