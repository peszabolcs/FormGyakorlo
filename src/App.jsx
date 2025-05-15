import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./formConfig";
import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import SummaryPage from "./SummaryPage";
import "./App.css";

function App() {
  return (
    <Box className="main-bg" sx={{ minHeight: "100vh", py: 6 }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FormPage1 />} />
            <Route path="/step2" element={<FormPage2 />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Box>
  );
}

export default App;
