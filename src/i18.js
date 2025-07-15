import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "fa",
    resources: {
      en: {
        translation: {
          // --- کلیدهای عمومی منو ---
          adminPanelTitle: "Management Panel",
          open_btn: "open menu",
          close_btn: "close menu",
          profile: "Profile",
          logout: "Logout",
          changeLanguage: "Change Language",
          theme_light: "Light Mode",
          theme_dark: "Dark Mode",
          dashboard: "Dashboard",
          products: "Products",
          orders: "Orders",
          users: "Users",
          users_list: "Users List", // کلید جدید برای زیرمنو
          roles: "Roles", // کلید جدید برای زیرمنو و صفحه نقش‌ها
          settings: "Settings",
          security: "Security",
          authentication: "Authentication",
          login: "Login",
          register: "Register",
          change_password: "Change Password",

          // --- کلیدهای عمومی برای کامپوننت مدیریت ---
          management: {
            loading: "Loading...",
            actions: "Actions",
            edit: "Edit",
            delete: "Delete",
            save: "Save",
            cancel: "Cancel",
            searchPlaceholder: "Search...",
            confirmDeleteTitle: "Confirm Delete",
            confirmDeleteMessage:
              "Are you sure you want to delete item with ID {{id}}? This action cannot be undone.",
          },

          // --- کلیدهای اختصاصی مدیریت کاربران ---
          userManagement: {
            title: "User Management",
            addButton: "Add User",
            noItemsFound: "No users found.",
            addTitle: "Add New User",
            editTitle: "Edit User",
            fetchError: "Error fetching users.",
            allRoles: "All Roles",
            form: {
              firstName: "First Name",
              lastName: "Last Name",
              username: "Username",
              password: "Password",
              passwordPlaceholder: "Leave blank to keep current password",
              role: "Role",
            },
            table: {
              id: "ID",
              firstName: "First Name",
              lastName: "Last Name",
              username: "Username",
              role: "Role",
            },
          },

          // --- کلیدهای اختصاصی مدیریت نقش‌ها (بخش جدید) ---
          roleManagement: {
            title: "Role Management",
            addButton: "Add Role",
            noItemsFound: "No roles found.",
            addTitle: "Add New Role",
            editTitle: "Edit Role",
            fetchError: "Error fetching roles.",
            form: {
              name: "Role Name",
              rank: "Rank",
            },
            table: {
              id: "ID",
              name: "Role Name",
              rank: "Rank",
            },
          },
        },
      },
      fa: {
        translation: {
          // --- کلیدهای عمومی منو ---
          adminPanelTitle: "پنل مدیریت",
          open_btn: "بازکردن منو",
          close_btn: "بستن منو",
          profile: "پروفایل",
          logout: "خروج از حساب",
          changeLanguage: "تغییر زبان",
          theme_light: "حالت روشن",
          theme_dark: "حالت تاریک",
          dashboard: "داشبورد",
          products: "محصولات",
          orders: "سفارشات",
          users: "کاربران",
          users_list: "لیست کاربران", // کلید جدید
          roles: "نقش‌ها", // کلید جدید
          settings: "تنظیمات",
          security: "امنیت",
          authentication: "احراز هویت",
          login: "ورود",
          register: "ثبت نام",
          change_password: "رمز عبور",

          // --- کلیدهای عمومی برای کامپوننت مدیریت ---
          management: {
            loading: "در حال بارگذاری...",
            actions: "عملیات",
            edit: "ویرایش",
            delete: "حذف",
            save: "ذخیره",
            cancel: "لغو",
            searchPlaceholder: "جستجو...",
            confirmDeleteTitle: "تأیید حذف",
            confirmDeleteMessage:
              "آیا از حذف مورد با شناسه {{id}} مطمئن هستید؟ این عمل قابل بازگشت نیست.",
          },

          // --- کلیدهای اختصاصی مدیریت کاربران ---
          userManagement: {
            title: "مدیریت کاربران",
            addButton: "افزودن کاربر",
            noItemsFound: "هیچ کاربری یافت نشد.",
            addTitle: "افزودن کاربر جدید",
            editTitle: "ویرایش کاربر",
            fetchError: "خطا در دریافت لیست کاربران.",
            allRoles: "همه نقش‌ها",
            form: {
              firstName: "نام",
              lastName: "نام خانوادگی",
              username: "نام کاربری",
              password: "رمز عبور",
              passwordPlaceholder: "برای عدم تغییر، خالی بگذارید",
              role: "نقش",
            },
            table: {
              id: "شناسه",
              firstName: "نام",
              lastName: "نام خانوادگی",
              username: "نام کاربری",
              role: "نقش",
            },
          },

          // --- کلیدهای اختصاصی مدیریت نقش‌ها (بخش جدید) ---
          roleManagement: {
            title: "مدیریت نقش‌ها",
            addButton: "افزودن نقش",
            noItemsFound: "هیچ نقشی یافت نشد.",
            addTitle: "افزودن نقش جدید",
            editTitle: "ویرایش نقش",
            fetchError: "خطا در دریافت لیست نقش‌ها.",
            form: {
              name: "نام نقش",
              rank: "رتبه",
            },
            table: {
              id: "شناسه",
              name: "نام نقش",
              rank: "رتبه",
            },
          },
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
