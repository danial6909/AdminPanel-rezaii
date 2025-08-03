import React from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import "./ResourceControls.css"

const ResourceControls = ({
  searchTerm,
  onSearchChange,
  onAddItemClick,
  FilterComponent,
  resourceName,
}) => {
  const { t } = useTranslation();

  return (
    <div className="controls">
      <div className="search-box">
        <span className="search-icon">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder={t("management.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* اگر کامپوننت فیلتر وجود داشت، آن را رندر کن */}
      {FilterComponent && <FilterComponent />}

      <button className="add-user-btn" onClick={onAddItemClick}>
        <PersonAddAltIcon />
        <span>{t(`${resourceName}Management.addButton`)}</span>
      </button>
    </div>
  );
};

export default ResourceControls;
