import React from "react";
import Image from "next/image";

import { ButtonType } from "@utils/types";

const Button: React.FC<ButtonType> = ({
  text,
  textColor = "white",
  textSize = "body",
  fontWeight = "normal",
  iconSrc,
  iconAlt = "",
  iconWidth = 22,
  iconHeight = 36,
  disabled = false,
  extraStyles = "",
  onClick,
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-button pl-2 pr-2 pt-3 pb-3 bg-light_blue transition-transform transform active:scale-95 cursor-pointer ${extraStyles} 
      ${
        disabled
          ? "bg-gray-800 cursor-not-allowed"
          : "bg-light_blue cursor-pointer"
      }`}
      onClick={disabled ? undefined : onClick}
    >
      <span className={`text-${textColor} font-${fontWeight} text-${textSize}`}>
        {text}
      </span>
      {iconSrc && (
        <Image
          className="ml-2"
          src={iconSrc}
          alt={iconAlt}
          width={iconWidth}
          height={iconHeight}
        />
      )}
    </div>
  );
};

export default Button;
