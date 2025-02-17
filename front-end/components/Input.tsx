import React from "react";

import Alert from "@components/Alert";
import { InputType } from "@utils/types";
import { INPUT_COLORS } from "@utils/constants";

type InputProps = InputType & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  title,
  name,
  label,
  icon,
  error,
  type = "text",
  ...otherProps
}) => {
  return (
    <>
      <div className="relative flex w-full flex-wrap items-stretch mb-3">
        <label
          htmlFor={name}
          className="block text-body font-medium text-deep_blue mb-1"
        >
          {title}
        </label>
        {type === "color" ? (
          <div className="block w-full relative">
            <div className="flex space-x-2">
              {INPUT_COLORS.map((color) => (
                <div
                  key={color}
                  className={`w-16 h-16 mt-2 rounded-full cursor-pointer transition-transform transform active:scale-95 ${
                    otherProps.value === color ? "border-2 border-white" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                  onClick={() =>
                    otherProps.onChange?.({ target: { value: color } } as never)
                  }
                />
              ))}
            </div>
            <input type="hidden" name={name} value={otherProps.value} />
          </div>
        ) : (
          <input
            name={name}
            id={name}
            placeholder={label}
            className="px-3 py-4 placeholder-light_grey text-white relative bg-deep_grey rounded-lg text-body outline-none focus:outline-none focus:ring w-full pr-10"
            {...otherProps}
          />
        )}
        {icon && (
          <span className="z-10 h-full leading-normal font-normal absolute text-center text-primary-200 bg-transparent rounded text-lg items-center justify-center w-8 right-0 pr-3 py-4">
            <i className={icon}></i>
          </span>
        )}
      </div>
      {error && <Alert message={error} type="error" />}
    </>
  );
};

export default Input;
