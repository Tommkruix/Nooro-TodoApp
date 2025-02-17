import React from "react";

export type ButtonType = {
  text: string;
  textColor?: string;
  textSize?: string;
  fontWeight?: string;
  iconSrc?: string;
  iconAlt?: string;
  iconWidth?: number;
  iconHeight?: number;
  disabled?: boolean;
  extraStyles?: string;
  onClick?: () => void;
};

export type AlertType = {
  message: string;
  type: "error" | "success" | "warning" | "info";
};

export type InputType = {
  title?: string;
  name: string;
  label: string;
  icon?: string;
  error?: string;
  type?: "text" | "color";
};

export type BreadcrumbType = {
  leftContent?: React.ReactNode;
  leftLink?: string;
  rightContent?: React.ReactNode;
  rightLink?: string;
  extraStyles?: string;
};

export type TodoItemType = {
  id: number;
  checked: boolean;
  content: string;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

export type TodoType = {
  id?: number;
  title: string;
  color: string;
  completed: boolean;
  created?: Date;
  updated?: Date;
};
