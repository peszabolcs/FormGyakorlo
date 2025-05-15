import { Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup
      variant="contained"
      size="small"
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Button
        onClick={() => changeLanguage("hu")}
        color={i18n.language === "hu" ? "primary" : "inherit"}
      >
        HU
      </Button>
      <Button
        onClick={() => changeLanguage("en")}
        color={i18n.language === "en" ? "primary" : "inherit"}
      >
        EN
      </Button>
    </ButtonGroup>
  );
}

export default LanguageSwitcher;
