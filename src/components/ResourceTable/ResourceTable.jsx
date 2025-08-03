import React from "react";
import { useTranslation } from "react-i18next";
import TableSkeleton from "../TableSkeleton-loader/TableSkeleton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ResourceTable.css";


const ResourceTable = ({
  loading,
  error,
  columns,
  items,
  onEditClick,
  onDeleteClick,
  currentUserId,
  resourceName,
}) => {
  const { t } = useTranslation();

  const renderTableBody = () => {
    if (loading) {
      return <TableSkeleton columns={columns} />;
    }
    if (error) {
      return (
        <tr>
          <td colSpan={columns.length + 1} className="status-cell error">
            {error}
          </td>
        </tr>
      );
    }
    if (items.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length + 1} className="status-cell">
            {t(`${resourceName}Management.noItemsFound`)}
          </td>
        </tr>
      );
    }

    return items.map((item) => (
      <tr
        key={item.id}
        className={item.id === currentUserId ? "highlighted-row" : ""}
      >
        {columns.map((col) => (
          <td key={col.key}>{col.render ? col.render(item) : item[col.key]}</td>
        ))}
        {/* دکمه‌های عملیات */}
        <td>
          {item.id !== currentUserId ? (
            <div className="action-buttons">
              <button
                className="btn btn-edit"
                title={t("management.edit")}
                onClick={() => onEditClick(item)}
              >
                <EditIcon fontSize="small" />
              </button>
              <button
                className="btn btn-delete"
                title={t("management.delete")}
                onClick={() => onDeleteClick(item.id)}
              >
                <DeleteIcon fontSize="small" />
              </button>
            </div>
          ) : null}
        </td>
      </tr>
    ));
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
            <th>{t("management.actions")}</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
