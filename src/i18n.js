// import i18n from "i18next";
// import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { initReactI18next } from "react-i18next";

// import translationEN from "../src/translationEN.json";
// import translationDE from "../src/translationDE.json";

// const resources = {
//   en: {
//     translation: translationEN
//   },
//   de: {
//     translation: translationDE
//   }
// };

// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: "en",
//     debug: true,
//     detection: {
//       order: ["queryString", "cookie"],
//       cache: ["cookie"],
//     },
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;

import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationAB from "./locales/ab/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  ab: {
    translation: translationAB,
  },
};

const language = localStorage.getItem("I18N_LANGUAGE");
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "en");
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("I18N_LANGUAGE") || "en",
    fallbackLng: "en", // use en if detected lng is not available

    // keySeparator: false, // we do not use keys in form donations.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
