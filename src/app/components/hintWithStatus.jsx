import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoIcon from "@mui/icons-material/Info";

export default function HintWithStatus({ status = "info", text, children }) {

  const getIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircleOutlineIcon className="text-green-500" />;
      case "warning":
        return <WarningAmberIcon className="text-amber-500" />;
      case "error":
        return <ErrorOutlineIcon className="text-red-500" />;
      case "info":
        return <InfoIcon className="text-blue-500" />;
      default:
        return <InfoIcon className="text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50";
      case "warning":
        return "border-amber-200 bg-amber-50";
      case "error":
        return "border-red-200 bg-red-50";
      case "info":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div
      className={`w-full h-auto flex items-center p-4 md:p-6 border-4 my-4 rounded-md ${getBorderColor()}`}
    >
      {getIcon()}
      <span className="ml-4 text-gray-700 text-md">{text}</span>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
