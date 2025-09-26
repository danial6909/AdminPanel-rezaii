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
          logotitle: "M R K",
          open_btn: "open menu",
          close_btn: "close menu",
          profile: "Profile",
          logout: "Logout",
          changeLanguage: "Change Language",
          theme_light: "Light Mode",
          theme_dark: "Dark Mode",
          ConfigPage: "Config",
          Frequency: "Frequency",
          Service: "Service",
          Network: "Network",
          Channel: "Channel",
          channelsList: "ChannelsList",
          streamss: "Streams",
          ConnectedDevices: "Connected Devices",
          StreamingChannels: "Streaming Channels",
          Recordings: "Recordings",
          Cards: "Cards",
          ConfigStream: "Streams",
          orders: "Orders",
          users: "Users",
          user_list: "Users List",
          roles: "Roles",
          Settings: "Settings",
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
            noItemsFound: "No items found.",
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

          cardsManagement: {
            title: "Cards Management",
            addButton: "Install Cards",
            table: {
              device: "Device",
              adapter: "Adapter",
              frontend: "Frontend",
              name: "Name",
              type: "Type",
              frequency: "Frequency",
              enabled: "Enabled",
            },
            action: "Actions",
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

          // --- Frequencies Management ---
          frequenciesManagement: {
            title: "Frequency Management",
            addButton: "Add Frequency",
            noItemsFound: "No frequencies found.",
            addTitle: "Add New Frequency",
            editTitle: "Edit Frequency",
            fetchError: "Error fetching frequencies.",
            form: {
              name: "Frequency Name",
              channelCount: "Channel Count",
              providerCount: "Provider Count",
              network: "Network",
              status: "Scan Result",
            },
            table: {
              id: "ID",
              name: "Frequency Name",
              channelCount: "Channel Count",
              providerCount: "Provider Count",
              network: "Network",
              status: "Scan Result",
            },
          },

          // --- Service Management ---
          servicesManagement: {
            title: "Service Management",
            addButton: "Add Service",
            noItemsFound: "No services found.",
            fetchError: "Error fetching services.",
            form: {
              name: "Service Name",
              channel: "Channel",
              frequency: "Frequency",
              provider: "Provider",
              network: "Network",
              status: "Status",
            },
            table: {
              name: "Service Name",
              channel: "Channel",
              frequency: "Frequency",
              provider: "Provider",
              network: "Network",
              status: "Status",
            },
          },

          // --- Network Management ---
          networksManagement: {
            title: "Network Management",
            addButton: "Add Network",
            noItemsFound: "No networks found.",
            fetchError: "Error fetching networks.",
            form: {
              name: "Network Name",
              channelCount: "Channel Count",
              status: "Status",
            },
            table: {
              name: "Network Name",
              channelCount: "Channel Count",
              status: "Status",
            },
          },

          // --- Channel Management ---
          channelsManagement: {
            title: "Channel Management",
            addButton: "Add Channel",
            noItemsFound: "No channels found.",
            fetchError: "Error fetching channels.",
            form: {
              number: "Channel Number",
              name: "Channel Name",
              status: "Status",
            },
            table: {
              number: "Channel Number",
              name: "Channel Name",
              status: "Status",
              action: "Action",
            },
          },

          // --- Channel Group Management ---
          channelGroupsManagement: {
            title: "Channel Group Management",
            addButton: "Add Group",
            noItemsFound: "No groups found.",
            fetchError: "Error fetching groups.",
            form: {
              name: "Group Name",
            },
            table: {
              name: "Group Name",
            },
          },

          "mumudvb/dvb-sManagement": {
            title: "Stream Configuration Management",
            addButton: "Add Configuration",
            addTitle: "Add Configuration",
            editTitle: "Edit Configuration",
            noItemsFound: "No streams found.",
            fetchError: "Error fetching stream list.",
            form: {
              name: "Card Name",
              adapter: "Adapter",
              polarization: "Polarization",
              symbolRate: "Symbol Rate",
              forwardErrorCorrection: "Forward Error Correction",
              multicastIpAddressAndPort: "Multicast IP Address",
              rewritePat: "Rewrite PAT",
              dedicatedThread: "Dedicated Thread",
              dedicatedThreadBufferSize: "Dedicated Thread Buffer Size",
              multicastTimeToLive: "Multicast Time to Live",
              autoConfiguration: "Auto Configuration",
              frequency: "Frequency",
              bandwidth: "Bandwidth",
              configName: "Configuration Name",
            },
            table: {
              id: "ID",
              name: "Name",
              frequency: "Frequency",
              status: "Status",
            },
          },
          "mumudvb/dvb-tManagement": {
            title: "Stream Configuration Management",
            addButton: "Add Configuration",
            addTitle: "Add Configuration",
            editTitle: "Edit Configuration",
            noItemsFound: "No streams found.",
            fetchError: "Error fetching stream list.",
          },

          // --- Connected Devices ---
          connectedDevicesManagement: {
            title: "Connected Devices",
            addButton: "Add Device",
            fetchError: "Error fetching connected devices.",
            noItemsFound: "No devices found.",
            active: "Connected",
            table: {
              id: "ID",
              ip: "IP Address",
              connectionDate: "Connection Date",
              connectionTime: "Connection Time",
              disconnectionTime: "Disconnection Time",
            },
          },

          // --- Streaming Channels ---
          streamingChannelsManagement: {
            title: "Live Streaming Channels",
            addButton: "Add Channel",
            fetchError: "Error fetching streaming channels.",
            noItemsFound: "No streams found.",
            table: {
              channel: "Channel",
              ip: "IP Address",
              date: "Date",
              time: "Time",
              input: "Input",
              output: "Output",
            },
          },

          "channels/admin/recordManagement": {
            title: "Recorded Items Management",

            addButton: "Add Item",
            noItemsFound: "No recorded items found.",
            fetchError: "Error fetching recorded items list.",
            form: {
              name: "Name",
              channelName: "Channel Name",
              status: "Status",
            },
            table: {
              id: "ID",
              user: "User Name",
              address: "Stream Address",
              status: "Recording Status",
            },
          },
          "channels/streamsManagement": {
            addButton: "Add Streams",
            title: "Streams Config Management",
          },

          streams: {
            filter: "All channels",
            form: {
              streamTypeLabel: "Protocol",
              timeshiftMinuteLabel: "Timeshift Duration (minute)",
              rtpUrlLabel: "Destination IP Address",
              channelLabel: "Channels",
              urlLabel: "Stream Address",
              preview: "preview",
              protocol: "protocol",
              sourceTypeLabel: "Format",
            },
          },

          EPGManagement: {
            title: "EPG Management",
            addButton: "Add EPG",
            fetchError: "Error fetching device list.",
            noItemsFound: "No devices found.",
            active: "Connected",
            table: {
              id: "ID",
              name: "Program Name",
              description: "Description",
              startTime: "Start Date",
              endTime: "End Date",
            },
          },
          settingManagement: {
            title: "Settings Management",
            addButton: "Add Setting",
            noItemsFound: "No groups found.",
            fetchError: "Error fetching groups list.",
            table: {
              name: "Field Name",
              value: "Value",
            },
          },
          // ConfigStreamPage: {
          //   title: "Streams Management",
          //   addButton: "Add Stream",
          //   noItemsFound: "No streams found.",
          //   fetchError: "Error fetching streams.",
          //   form: {
          //     device: "Device",
          //     adapter: "Adapter",
          //     frontend: "Frontend",
          //     name: "Name",
          //     type: "Type",
          //     frequency: "Frequency",
          //   },
          //   table: {
          //     device: "Device",
          //     adapter: "Adapter",
          //     frontend: "Frontend",
          //     name: "Name",
          //     type: "Type",
          //     frequency: "Frequency",
          //   },
          // },
        },
      },
      fa: {
        translation: {
          // --- کلیدهای عمومی منو ---
          adminPanelTitle: "پنل مدیریت",
          logotitle: "مبنا رایانه کیان",
          open_btn: "بازکردن منو",
          close_btn: "بستن منو",
          profile: "پروفایل",
          logout: "خروج از حساب",
          changeLanguage: "تغییر زبان",
          theme_light: "حالت روشن",
          theme_dark: "حالت تاریک",
          ConfigPage: "داشبورد",
          Frequency: "فرکانس",
          Service: "سرویس",
          Network: "شبکه",
          Channel: "کانال",
          channelsList: "لیست کانال ها",
          streamss: "استریم ها",
          Settings: "تنظیمات",
          EPG: "EPG",
          StreamingChannels: "کانال‌های در حال پخش",
          Recordings: "موارد ضبط شده",
          Cards: "کارت ها",
          ConfigStream: "پیکربندی",
          "dvb-s_list": "DVB-S",
          "dvb-t_list": "DVB-T",
          orders: "سفارشات",
          users: "کاربران",
          user_list: "لیست کاربران",
          roles: "نقش‌ها",
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
            noItemsFound: "موردی یافت نشد.",
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

          cardsManagement: {
            title: "مدیریت کارت‌ها",
            addButton: "نصب کارت‌ها",
            table: {
              device: "دستگاه",
              adapter: "کارت",
              frontend: "فرانت‌اند",
              name: "نام",
              type: "نوع",
              frequency: "فرکانس",
              enabled: "فعال",
            },
            action: "عملیات",
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

          // --- مدیریت فرکانس‌ها ---
          frequenciesManagement: {
            title: "مدیریت فرکانس‌ها",
            addButton: "افزودن فرکانس",
            noItemsFound: "هیچ فرکانسی یافت نشد.",
            addTitle: "افزودن فرکانس جدید",
            editTitle: "ویرایش فرکانس",
            fetchError: "خطا در دریافت لیست فرکانس‌ها.",
            form: {
              name: "نام فرکانس",
              channelCount: "تعداد کانال‌ها",
              providerCount: "تعداد سرویس‌ها",
              network: "شبکه",
              status: "نتیجه اسکن",
            },
            table: {
              id: "شناسه",
              name: "نام فرکانس",
              channelCount: "تعداد کانال‌ها",
              providerCount: "تعداد سرویس‌ها",
              network: "شبکه",
              status: "نتیجه اسکن",
            },
          },

          // --- مدیریت سرویس‌ها ---
          servicesManagement: {
            title: "مدیریت سرویس‌ها",
            addButton: "افزودن سرویس",
            noItemsFound: "سرویسی یافت نشد.",
            fetchError: "خطا در دریافت لیست سرویس‌ها.",
            form: {
              name: "نام سرویس",
              channel: "شماره کانال",
              frequency: "فرکانس",
              provider: "ارائه‌دهنده",
              network: "شبکه",
              status: "وضعیت",
            },
            table: {
              name: "نام سرویس",
              channel: "شماره کانال",
              frequency: "فرکانس",
              provider: "ارائه‌دهنده",
              network: "شبکه",
              status: "وضعیت",
            },
          },

          // --- مدیریت شبکه‌ها ---
          networksManagement: {
            title: "مدیریت شبکه‌ها",
            addButton: "افزودن شبکه",
            noItemsFound: "شبکه‌ای یافت نشد.",
            fetchError: "خطا در دریافت لیست شبکه‌ها.",
            form: {
              name: "نام شبکه",
              channelCount: "تعداد کانال",
              status: "وضعیت",
            },
            table: {
              name: "نام شبکه",
              channelCount: "تعداد کانال",
              status: "وضعیت",
            },
          },

          // --- مدیریت کانال‌ها ---
          channelsManagement: {
            title: "مدیریت کانال‌ها",
            addButton: "افزودن کانال",
            noItemsFound: "کانالی یافت نشد.",
            fetchError: "خطا در دریافت لیست کانال‌ها.",
            form: {
              number: "شماره کانال",
              name: "نام کانال",
              status: "وضعیت",
            },
            table: {
              number: "شماره کانال",
              name: "نام کانال",
              status: "وضعیت",
              action: "عملیات",
            },
          },

          // --- مدیریت گروه کانال‌ها ---
          settingManagement: {
            title: "مدیریت تنظیمات",
            addButton: "افزودن تنظیمات",
            noItemsFound: "گروهی یافت نشد.",
            fetchError: "خطا در دریافت لیست گروه‌ها.",
            table: {
              name: "نام فیلد",
              value: "مقدار",
            },
          },

          // --- دستگاه‌های متصل ---
          EPGManagement: {
            title: "مدیریت EPG",
            addButton: "افزودن EPG",
            fetchError: "خطا در دریافت لیست دستگاه‌ها.",
            noItemsFound: "دستگاهی یافت نشد.",
            active: "متصل",
            table: {
              id: "شناسه",
              name: "نام برنامه",
              description: "توضیحات",
              startTime: "تاریخ شروع",
              endTime: "تاریخ پایان",
            },
          },

          // --- کانال‌های در حال پخش ---
          streamingChannelsManagement: {
            title: "کانال‌های در حال پخش زنده",
            addButton: "افزودن کانال",
            fetchError: "خطا در دریافت لیست کانال‌ها.",
            noItemsFound: "کانال در حال پخشی یافت نشد.",
            table: {
              channel: "کانال",
              ip: "آدرس IP",
              date: "تاریخ",
              time: "زمان",
              input: "ورودی",
              output: "خروجی",
            },
          },

          // --- مدیریت موارد ضبط شده ---
          "channels/admin/recordManagement": {
            title: "مدیریت موارد ضبط شده",
            addButton: "افزودن مورد",
            noItemsFound: "مورد ضبط شده‌ای یافت نشد.",
            fetchError: "خطا در دریافت لیست موارد ضبط شده.",
            form: {
              name: "نام",
              channelName: "نام کانال",
              status: "وضعیت",
            },
            table: {
              id: "شناسه",
              user: "نام کاربر",
              address: "آدرس استریم",
              status: "وضعیت ضبط",
            },
          },
          "mumudvb/dvb-sManagement": {
            title: "مدیریت پیکربندی استریم‌ها",
            addButton: "افزودن پیکربندی",
            addTitle: "افزودن پیکربندی",
            editTitle: "ویرایش  پیکربندی",
            noItemsFound: "هیچ استریمی یافت نشد.",
            fetchError: "خطا در دریافت لیست استریم‌ها.",
            form: {
              name: "نام کارت",
              adapter: "کارت",
              polarization: "جهت امواج ارسالی از ماهواره",
              symbolRate: "سرعت ارسال داده از ماهواره",
              forwardErrorCorrection: "تصحیح خطاهای ارسالی",
              multicastIpAddressAndPort: "آدرس مولتی کست",
              rewritePat: "بازنویسی لیست کانال ها",
              dedicatedThread: "استفاده از پردازش اختصاصی",
              dedicatedThreadBufferSize: "حافظه موقت پردازش اختصاصی",
              multicastTimeToLive: "مولتی کست time to live",
              autoConfiguration: "پیکربندی خودکار",
              frequency: "فرکانس",
              bandwidth: "پهنای باند",
              configName: "نام پیکربندی",
            },
            table: {
              id: "شناسه",
              name: "نام",
              frequency: "فرکانس",
              status: "وضعیت",
            },
          },
          "mumudvb/dvb-tManagement": {
            title: "مدیریت پیکربندی استریم‌ها",
            addButton: "افزودن پیکربندی",
            editTitle: "ویرایش  پیکربندی",
            addTitle: "افزودن پیکربندی",
            noItemsFound: "هیچ استریمی یافت نشد.",
            fetchError: "خطا در دریافت لیست استریم‌ها.",
          },
          "channels/streamsManagement": {
            addButton: "افزودن استریم ها",
            title: "مدیریت پیکیربندی استریم ها",
          },
          streams: {
            filter: "همه کانال ها",
            form: {
              streamTypeLabel: "پروتکل",
              timeshiftMinuteLabel: "مدت زمان تایم‌شیفت (دقیقه)",
              rtpUrlLabel: "آدرس IP مقصد",
              channelLabel: "کانال‌ها",
              urlLabel: "آدرس استریم",
              preview: "پیش‌نمایش",
              protocol: "پروتکل",
              sourceTypeLabel: "فرمت ورودی",
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
