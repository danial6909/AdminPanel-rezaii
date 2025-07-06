import React, { createContext, useState, useEffect, useContext } from "react";

// ۱. ایجاد کانتکست (Context)
// یک "فضای اشتراک‌گذاری" سراسری برای نگهداری اطلاعات تم ایجاد می‌کند.
const ThemeContext = createContext();

// ۲. ایجاد فراهم‌کننده کانتکست (Provider)
// این کامپوننت، داده‌ها را در فضای اشتراکی قرار می‌دهد و تمام فرزندان خود را پوشش می‌دهد.
export const ThemeProvider = ({ children }) => {
  // تعریف state برای نگهداری وضعیت فعلی تم (light یا dark)
  const [theme, setTheme] = useState(
    // برای مقدار اولیه، ابتدا localStorage را چک می‌کند، اگر خالی بود 'light' را قرار می‌دهد.
    () => localStorage.getItem("theme") || "light"
  );

  // افکت (Effect) برای اعمال تم در کل سند HTML و ذخیره آن
  useEffect(() => {
    // یک اتریبیوت به نام data-theme روی تگ <html> تنظیم می‌کند تا در CSS استفاده شود.
    document.documentElement.setAttribute("data-theme", theme);
    // انتخاب کاربر را در حافظه مرورگر (localStorage) ذخیره می‌کند تا در بازدیدهای بعدی باقی بماند.
    localStorage.setItem("theme", theme);
  }, [theme]); 

  // تابعی برای سوییچ کردن بین تم روشن و تاریک
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // مقداری که می‌خواهیم در کل برنامه به اشتراک بگذاریم (وضعیت فعلی و تابع تغییر آن)
  const value = { theme, toggleTheme };

  return (
    // کامپوننت Provider، مقدار value را در دسترس تمام کامپوننت‌های فرزند قرار می‌دهد.
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// ۳. ایجاد یک هوک (Hook) سفارشی برای استفاده آسان‌تر از کانتکست
export const useTheme = () => {
  // از هوک useContext برای دسترسی به مقدار فراهم‌شده توسط ThemeProvider استفاده می‌کند.
  const context = useContext(ThemeContext);

  // اگر کامپوننتی خارج از پوشش ThemeProvider از این هوک استفاده کند، یک خطا نمایش می‌دهد.
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  // مقدار کانتکست (شامل theme و toggleTheme) را برمی‌گرداند.
  return context;
};
