import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./translations";

const savedLanguage = localStorage.getItem("language") || "fr";

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: savedLanguage,
    fallbackLng: "fr",

    interpolation: {
      escapeValue: false,
    },
  });
i18n.on("languageChanged", (language) => {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
});
export default i18n;