import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ResourceControls from "../../components/ResourceControls/ResourceControls";
import ResourceTable from "../../components/ResourceTable/ResourceTable"; 
// import "./CardsPage.css";

const EPG_Page = () => {
  
  const { t, i18n } = useTranslation();
    const [allGroups, setAllGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [openGroupId, setOpenGroupId] = useState(null);
  

    const fetchAllGroups = useCallback(async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/mumudvb/epg");
        setAllGroups(response.data);
        console.log("Data received from server:", response.data);
      } catch (error) {
        console.error("Failed to fetch card groups:", error);
        Swal.fire({
          icon: "error",
          title: "خطا در دریافت اطلاعات",
          text: "نتوانستیم لیست گروه‌ها را از سرور دریافت کنیم.",
        });
      } finally {
        setIsLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchAllGroups();
    }, [fetchAllGroups]);
  
  
    const toggleGroup = (groupId) => {
      setOpenGroupId((prevId) => (prevId === groupId ? null : groupId));
    };
  
  const columns = [
    { key: "id", header: t("EPGManagement.table.id") },
    { key: "name", header: t("EPGManagement.table.name") },
    {
      key: "description",
      header: t("EPGManagement.table.description"),
    },
    {
      key: "startTime",
      header: t("EPGManagement.table.startTime"),
    },
    {
      key: "endTime",
      header: t("EPGManagement.table.endTime"),
    },
  ];

 const searchFields = ["name", "startTime", "duration"];


const formatCardData = (Epg) => {
  console.log("Epg object to be formatted:", Epg);

  return {
    id: Epg.id,
    name: Epg.programName,
    description: Epg.description,
    startTime: Epg.startTime,
    endTime: Epg.endTime || "N/A",
  };
  };
  
    const filterCards = (cardsArray) => {
      return cardsArray.filter((card) => {
        return searchFields.some((field) =>
          card[field]
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      });
    };
 return (
   <div className="cards-page-container" dir={i18n.dir()}>
     {/* هدر اصلی در بالای کامپوننت */}
     <div className="header">
       <h1>{t("EPGManagement.title")}</h1>
     </div>
     <ResourceControls
       searchTerm={searchTerm}
       onSearchChange={setSearchTerm}
       resourceName="EPG"
     />

     {isLoading && <p>در حال بارگذاری گروه‌ها...</p>}

     {!isLoading &&
       allGroups.map((group) => {
         const filteredCards = filterCards(group.values).map(formatCardData);
         // اگر هیچ کارتی در این گروه وجود نداشت و یا فیلتر شده بود، آن را نمایش نده
         if (filteredCards.length === 0 && searchTerm) return null;

         return (
           <div key={group.id} className="group-accordion">
             <div
               className={`group-header ${
                 openGroupId === group.id ? "active" : ""
               }`}
               onClick={() => toggleGroup(group.id)}
             >
               <div className="group-header-text">
                 <h3>{group.name}</h3>
               </div>
               <div className="group-header-icon">
                 {openGroupId === group.id ? (
                   <ExpandLessIcon />
                 ) : (
                   <ExpandMoreIcon />
                 )}
               </div>
             </div>

             {/* نمایش شرطی جدول */}
             {openGroupId === group.id && (
               <div className="group-content">
                 <ResourceTable
                   loading={false}
                   error={null}
                   columns={columns}
                   items={filteredCards}
                   isReadOnly={true}
                   
                 />
               </div>
             )}
           </div>
         );
       })}
   </div>
 );
};

export default EPG_Page;
