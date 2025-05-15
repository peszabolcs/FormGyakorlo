import { Box } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { queryClient } from "./formConfig";
import "./App.css";

function App() {
  return (
    <Box className="main-bg" sx={{ minHeight: "100vh", py: 6 }}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </Box>
  );
}

export default App;
