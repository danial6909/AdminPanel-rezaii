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
          // --- General Menu Keys ---
          adminPanelTitle: "Management Panel",
          open_btn: "open menu",
          close_btn: "close menu",
          profile: "Profile",
          logout: "Logout",
          changeLanguage: "Change Language",
          theme_light: "Light Mode",
          theme_dark: "Dark Mode",
          dashboard: "Dashboard",
          Cards: "Cards",
          orders: "Orders",
          users: "Users",
          users_list: "Users List", // New key for submenu
          roles: "Roles", // New key for submenu and roles page
          settings: "Settings",
          security: "Security",
          authentication: "Authentication",
          login: "Login",
          register: "Register",
          change_password: "Change Password",

          // --- General Management Component Keys ---
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

          // --- User Management Specific Keys ---
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

          // --- Role Management Specific Keys ---
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

          "dvb/cardsManagement": {
            addButton: "Cards Scan",
          },

          cards: {
            scan: "Cards Scan",
            table: {
              device: "Device",
              adapter: "Adapter",
              frontend: "Frontend",
              name: "name",
              type: "Type",
              frequency: "Frequency",
              enabled: "Enabled",
            },
          },
          // --- Profile Page Specific Keys ---
          profilePage: {
            fetchErrorTitle: "Error Fetching Information",
            fetchErrorMessage:
              "An issue occurred while fetching user information.",
            avatarUpdateSuccess: "Profile picture updated successfully!",
            avatarUpdateError:
              "An issue occurred while uploading the profile picture.",
            coverUpdateSuccess: "Cover photo updated successfully!",
          },
          // --- Profile Header Specific Keys ---
          profileHeader: {
            changeCover: "Change Cover",
            nameSaveSuccess: "Name saved successfully!",
            nameSaveError: "An issue occurred while saving the name.",
          },
          // --- Username Section Specific Keys ---
          usernameSection: {
            newUsernameLabel: "New Username",
            usernameLabel: "Username",
            saveSuccess: "Username saved successfully!",
            saveError: "An issue occurred while saving the username.",
          },
          // --- Password Change Section Specific Keys ---
          passwordChangeSection: {
            changePasswordTitle: "Change Password",
            currentPasswordLabel: "Current Password",
            newPasswordLabel: "New Password",
            confirmNewPasswordLabel: "Confirm New Password",
            savePasswordButton: "Save Password",
            passwordLabel: "Password",
            changePasswordButton: "Change Password",
            newPasswordEmpty: "New password cannot be empty.",
            newPasswordLength:
              "New password must be at least 8 characters long.",
            passwordMismatch: "New password and confirmation do not match.",
            changeSuccess: "Password changed successfully!",
            currentPasswordIncorrect: "Current password is incorrect.",
            changeError: "An issue occurred while changing the password.",
          },
          common: {
            success: "Success",
            error: "Error",
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
          Cards: "کارت ها",
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

          "dvb/cardsManagement": {
            addButton: "اسکن کارت ها",
          },

          cards: {
            table: {
              device: "دستگاه",
              adapter: "کارت",
              frontend: "جلو",
              name: "نام",
              type: "نوع",
              frequency: "فرکانس",
              enabled: "فعال",
            },
          },
          // --- کلیدهای اختصاصی صفحه پروفایل ---
          profilePage: {
            fetchErrorTitle: "خطا در دریافت اطلاعات",
            fetchErrorMessage: "مشکلی در دریافت اطلاعات کاربری پیش آمد.",
            avatarUpdateSuccess: "عکس پروفایل با موفقیت به‌روزرسانی شد!",
            avatarUpdateError: "مشکلی در آپلود عکس پروفایل پیش آمد.",
            coverUpdateSuccess: "عکس کاور با موفقیت به‌روزرسانی شد!",
          },
          // --- کلیدهای اختصاصی هدر پروفایل ---
          profileHeader: {
            changeCover: "تغییر کاور",
            nameSaveSuccess: "نام با موفقیت ذخیره شد!",
            nameSaveError: "مشکلی در ذخیره نام پیش آمد.",
          },
          // --- بخش نام کاربری ---
          usernameSection: {
            newUsernameLabel: "نام کاربری جدید",
            usernameLabel: "نام کاربری",
            saveSuccess: "نام کاربری با موفقیت ذخیره شد!",
            saveError: "مشکلی در ذخیره نام کاربری پیش آمد.",
          },
          // --- بخش تغییر رمز عبور ---
          passwordChangeSection: {
            changePasswordTitle: "تغییر رمز عبور",
            currentPasswordLabel: "رمز عبور فعلی",
            newPasswordLabel: "رمز عبور جدید",
            confirmNewPasswordLabel: "تکرار رمز عبور جدید",
            savePasswordButton: "ذخیره رمز",
            passwordLabel: "رمز عبور",
            changePasswordButton: "تغییر رمز",
            newPasswordEmpty: "رمز عبور جدید نمی‌تواند خالی باشد.",
            newPasswordLength: "رمز عبور جدید باید حداقل 8 کاراکتر باشد.",
            passwordMismatch: "رمز عبور جدید و تکرار آن یکسان نیستند.",
            changeSuccess: "رمز عبور با موفقیت تغییر یافت!",
            currentPasswordIncorrect: "رمز عبور فعلی اشتباه است.",
            changeError: "مشکلی در تغییر رمز عبور پیش آمد.",
          },
          common: {
            success: "موفق",
            error: "خطا",
          },
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
