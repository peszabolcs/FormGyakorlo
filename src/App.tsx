import { Box } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { queryClient } from "./formConfig";
import { router } from "./router";
import "./App.css";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  return (
    <Box className="main-bg" sx={{ minHeight: "100vh", py: 6 }}>
      <QueryClientProvider client={queryClient}>
        <LanguageSwitcher />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Box>
  );
}

export default App;
