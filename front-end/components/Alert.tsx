import React from "react";

import { AlertType } from "@utils/types";

const Alert: React.FC<AlertType> = ({ message, type }) => {
  const getTypeColor = (type: AlertType["type"]): string => {
    switch (type) {
      case "error":
        return "bg-red-800";
      case "success":
        return "bg-green-800";
      case "warning":
        return "bg-yellow-800";
      case "info":
        return "bg-blue-800";
      default:
        return "";
    }
  };

  const typeColor = getTypeColor(type);

  return (
    <div
      className={`container ${typeColor} rounded shadow-md flex items-center text-white text-sm font-bold px-4 py-3 relative`}
      role="alert"
    >
      <svg
        width="20"
        height="20"
        fill="white"
        className="w-4 h-4 mr-2"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1216 1344v128q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h64v-384h-64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h384q26 0 45 19t19 45v576h64q26 0 45 19t19 45zm-128-1152v192q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-192q0-26 19-45t45-19h256q26 0 45 19t19 45z"></path>
      </svg>
      <p className={`text-white`}>{message}</p>
    </div>
  );
};

export default Alert;
