// src/layouts/AdminLayout.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./AdminLayout.css";

function AdminLayout() {
  // مرحله ۱: استیت و تابع کنترل‌کننده در اینجا تعریف می‌شوند
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  return (
    <div className="admin-container">
      <div className="admin-layout">
        <div className="admin-right">
          {/* مرحله ۲: ارسال وضعیت به سایدبار */}
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </div>

        <div className="admin-left">
          {/* مرحله ۳: ارسال تابع و وضعیت به هدر */}
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
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
