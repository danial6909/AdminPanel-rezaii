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
          adminPanelTitle: "Management Panel",
          profile: "Profile",
          logout: "Logout",
          changeLanguage: "Change Language",
          theme_light: "Light Mode",
          theme_dark: "Dark Mode",
          dashboard: "Dashboard",
          products: "Products",
          orders: "Orders",
          users: "Users",
          settings: "Settings",
          security: "Security",
          authentication: "Authentication",
          login: "Login",
          register: "Register",
          change_password: "Change Password",
          
          // کلیدهای مربوط به مدیریت کاربران (UsersPage)
          userManagement: {
            title: "User Management",
            searchPlaceholder: "Search users...",
            allRoles: "All Roles",
            addUserButton: "Add User",
            noUsersFound: "No users found.",
            addTitle: "Add New User",
            editTitle: "Edit User",
            validationError: "Please fill in all required fields.",
            table: {
              id: "ID",
              firstName: "First Name",
              lastName: "Last Name",
              username: "Username",
              password: "Password",
              role: "Role",
              actions: "Actions",
              edit: "Edit",
              delete: "Delete",
            },
            form: {
              firstName: "First Name",
              lastName: "Last Name",
              username: "Username",
              password: "Password",
              role: "Role",
              cancel: "Cancel",
              save: "Save",
            },
       
            confirmDeleteTitle: "Confirm Delete",
            confirmDeleteMessage: "Are you sure you want to delete user ID {{userId}}? This action cannot be undone.",
          },
        },
      },
      fa: {
        translation: {
          // کلیدهای فارسی
          adminPanelTitle: "پنل مدیریت",
          profile: "پروفایل",
          logout: "خروج از حساب",
          changeLanguage: "تغییر زبان",
          theme_light: "حالت روشن",
          theme_dark: "حالت تاریک",
          dashboard: "داشبورد",
          products: "محصولات",
          orders: "سفارشات",
          users: "کاربران",
          settings: "تنظیمات",
          security: "امنیت",
          authentication: "احراز هویت",
          login: "ورود",
          register: "ثبت نام",
          change_password: "رمز عبور",

          // کلیدهای مربوط به مدیریت کاربران (UsersPage)
          userManagement: {
            title: "مدیریت کاربران",
            searchPlaceholder: "جستجو کاربران...",
            allRoles: "همه نقش‌ها",
            addUserButton: "افزودن کاربر",
            noUsersFound: "هیچ کاربری یافت نشد.",
            addTitle: "افزودن کاربر جدید",
            editTitle: "ویرایش کاربر",
            validationError: "لطفاً تمام فیلدهای الزامی را پر کنید.",
            table: {
              id: "شناسه",
              firstName: "نام",
              lastName: "نام خانوادگی",
              username: "نام کاربری",
              password: "رمز عبور",
              role: "نقش",
              actions: "عملیات",
              edit: "ویرایش",
              delete: "حذف",
            },
            form: {
              firstName: "نام",
              lastName: "نام خانوادگی",
              username: "نام کاربری",
              password: "رمز عبور",
              role: "نقش",
              cancel: "لغو",
              save: "ذخیره",
            },

            confirmDeleteTitle: "تأیید حذف",
            confirmDeleteMessage: "آیا مطمئن هستید که می‌خواهید کاربر با ID {{userId}} را حذف کنید؟ این عمل قابل بازگشت نیست.",
          },
        },
      },
    },
    interpolation: {
      escapeValue: false, // برای React لازم است چون به طور پیش‌فرض از XSS محافظت می‌کند
    },
  });

export default i18n;
