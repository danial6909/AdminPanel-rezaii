import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";
import axiosInstance from "../../utils/axiosInstance";

export default function CartsPage() {
  const { t } = useTranslation();

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/cards?autoscan=false");
      setCards(response.data);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
      Swal.fire({
        icon: "error",
        title: "خطا در دریافت اطلاعات",
        text: "نتوانستیم لیست کارت‌ها را از سرور دریافت کنیم.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleInstallCards = () => {
    Swal.fire({
      title: "آیا از نصب کارت‌ها مطمئن هستید؟",
      text: "این فرآیند ممکن است تا ۱۵ دقیقه طول بکشد. در این مدت، لطفا صفحه را نبندید.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، نصب کن!",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        startInstallationProcess();
      }
    });
  };

  const startInstallationProcess = () => {
    Swal.fire({
      title: "در حال ارسال دستور نصب...",
      html: "لطفاً چند لحظه صبر کنید...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // ✅ تصحیح اصلی: رشته رو داخل یک آبجکت جیسون قرار دادیم
    const installData = {
      installFilePath: "~/LIVE/media_build/install.sh",
    };

    // ✅ حالا درخواست POST رو بدون تغییر هدر ارسال می‌کنیم
    axiosInstance
      .post("/cards/install", installData)
      .then(() => {
        Swal.update({
          title: "فرآیند نصب در سرور آغاز شد!",
          html: "در حال بررسی وضعیت... (این کار ممکن است طول بکشد)",
        });

        let attempts = 0;
        const maxAttempts = 30;

        const intervalId = setInterval(async () => {
          if (attempts >= maxAttempts) {
            clearInterval(intervalId);
            Swal.fire("خطا", "فرآیند نصب بیش از حد طول کشید.", "error");
            return;
          }

          try {
            const response = await axiosInstance.get("/cards/install/status");
            
            if (response.data.active === false) {
              clearInterval(intervalId);
              Swal.fire("موفق!", "نصب کارت‌ها با موفقیت انجام شد.", "success");
              fetchCards();
            } else {
              console.log(response.data.active)

              attempts++;
              console.log(`تلاش ${attempts}: وضعیت نصب هنوز کامل نشده.`);
            }
          } catch (error) {
            clearInterval(intervalId);
            Swal.fire("خطا", "مشکلی در بررسی وضعیت نصب پیش آمد.", "error");
          }
        }, 30000);
      })
      .catch((error) => {
        Swal.fire({
          title: "خطا در ارسال دستور",
          text:
            error.response?.data?.message ||
            "سرور نتوانست این دستور را پردازش کند.",
          icon: "error",
        });
        console.error("Install command POST error:", error);
      });
  };

  // ... بقیه کد بدون هیچ تغییری باقی می‌مونه ...
  const cardsColumns = [
    { key: "device", header: t("cards?autoscan=trueManagement.table.device") },
    {
      key: "adapter",
      header: t("cards?autoscan=trueManagement.table.adapter"),
    },
    {
      key: "frontend",
      header: t("cards?autoscan=trueManagement.table.frontend"),
    },
    { key: "name", header: t("cards?autoscan=trueManagement.table.name") },
    { key: "type", header: t("cards?autoscan=trueManagement.table.type") },
    {
      key: "frequency",
      header: t("cards?autoscan=trueManagement.table.frequency"),
    },
  ];

  const formatCardData = (card) => ({
    id: `${card.device}-${card.adapter}-${card.frontend}`,
    device: card.device,
    adapter: card.adapter,
    frontend: card.frontend,
    name: card.name || "N/A",
    type: card.type || "N/A",
    frequency: `${card.fmin}~${card.fmax}` || "N/A",
  });

  const searchFields = ["adapter", "name", "type"];

  return (
    <ResourceManagementPage
      resourceName="cards?autoscan=true"
      columns={cardsColumns}
      searchFields={searchFields}
      items={cards.map(formatCardData)}
      loading={isLoading}
      manualDataFetching={true}
      isReadOnly={true}
      overrideAddItemClick={handleInstallCards}
    />
  );
}
