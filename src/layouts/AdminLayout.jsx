// src/layouts/AdminLayout.jsx

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import "./AdminLayout.css";

// یک تابع کمکی که بیرون کامپوننت تعریف شده تا وضعیت نمایش را بر اساس عرض صفحه برگرداند
const getViewMode = () => {
  const width = window.innerWidth;
  if (width < 768) return "mobile"; // حالت موبایل
  if (width < 870) return "tablet"; // حالت تبلت
  return "desktop"; // حالت دسکتاپ
};

function AdminLayout() {
  // --- STATE های اصلی کامپوننت ---

  // State برای کنترل حالت جمع‌شده سایدبار در دسکتاپ
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  // State برای کنترل باز بودن سایدبار کشویی در موبایل
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // State برای نگهداری حالت نمایش فعلی (mobile, tablet, desktop)
  const [viewMode, setViewMode] = useState(getViewMode());

  // این `useEffect` به تغییرات اندازه پنجره گوش می‌دهد
  useEffect(() => {
    // این تابع با هر تغییر سایز پنجره، حالت `viewMode` را آپدیت می‌کند
    const handleResize = () => {
      const newViewMode = getViewMode();
      setViewMode(newViewMode);

      // اگر کاربر از حالت موبایل به تبلت یا دسکتاپ رفت، منوی باز موبایل را می‌بندیم
      if (newViewMode !== "mobile") {
        setIsMobileSidebarOpen(false);
      }
    };

    // اضافه کردن شنونده رویداد به پنجره
    window.addEventListener("resize", handleResize);

    // پاک‌سازی شنونده برای جلوگیری از نشت حافظه (memory leak)
    return () => window.removeEventListener("resize", handleResize);
  }, []); 


  // تابع اصلی برای باز و بسته کردن سایدبار که به هدر ارسال می‌شود
  const toggleSidebar = () => {
    if (viewMode === "mobile") {
      // در موبایل، منوی کشویی را باز و بسته می‌کند
      setIsMobileSidebarOpen((prevState) => !prevState);
    } else if (viewMode === "desktop") {
      // در دسکتاپ، سایدبار را جمع و باز می‌کند
      setIsDesktopCollapsed((prevState) => !prevState);
    }
    // در حالت تبلت، دکمه‌ای وجود ندارد پس این تابع کاری انجام نمی‌دهد
  };

  // این تابع فقط برای بستن منوی موبایل است و به سایدبار ارسال می‌شود
  const closeMobileSidebar = () => {
    if (viewMode === "mobile") {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <div className="admin-container">
      {/* این لایه تیره فقط در حالت موبایل و زمانی که منو باز است نمایش داده می‌شود */}
      {viewMode === "mobile" && isMobileSidebarOpen && (
        <div className="sidebar-backdrop" onClick={closeMobileSidebar}></div>
      )}

      <div className="admin-layout">

        <Sidebar
          isDesktopCollapsed={isDesktopCollapsed}
          isMobileSidebarOpen={isMobileSidebarOpen}
          viewMode={viewMode}
          closeMobileSidebar={closeMobileSidebar} // ارسال تابع بستن به سایدبار
        />



        <div className="admin-content-area">
          <Header
            toggleSidebar={toggleSidebar}
            // یک prop به نام `isSidebarOpen` می‌سازیم که وضعیت فعلی را به هدر اطلاع دهد
            isSidebarOpen={
              viewMode === "mobile" ? isMobileSidebarOpen : !isDesktopCollapsed
            }
            viewMode={viewMode}
          />
          <main className="admin-main">
            <Outlet />
          </main>
        </div>

        
      </div>
    </div>
  );
}

export default AdminLayout;
