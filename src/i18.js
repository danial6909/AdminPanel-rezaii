import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // افزونه تشخیص زبان مرورگر را فعال می‌کند
  .use(LanguageDetector)
  // i18next را به react-i18next متصل می‌کند
  .use(initReactI18next)
  // پیکربندی اولیه
  .init({
    // حالت دیباگ برای مشاهده لاگ‌ها در کنسول در حین توسعه
    debug: true,
    // زبان پیش‌فرض در صورتی که زبان مرورگر کاربر پشتیبانی نشود
    fallbackLng: "fa",
    // منابع ترجمه ما
    resources: {
      en: {
        translation: {
          // کلیدهای انگلیسی
          adminPanelTitle: "Store Management Panel",
          profile: "Profile",
          logout: "Logout",
          changeLanguage: "Change Language",
          theme_light: "Light Mode",
          theme_dark: "Dark Mode",
          dashboard: "Dashboard"
        },
      },
      fa: {
        translation: {
          // کلیدهای فارسی
          adminPanelTitle: "پنل مدیریت فروشگاه",
          profile: "پروفایل",
          logout: "خروج از حساب",
          changeLanguage: "تغییر زبان",
          theme_light: "حالت روشن",
          theme_dark: "حالت تاریک",
          dashboard:"داشبورد"
        },
      },
    },
    interpolation: {
      escapeValue: false, // برای React لازم است چون به طور پیش‌فرض از XSS محافظت می‌کند
    },
  });

export default i18n;
