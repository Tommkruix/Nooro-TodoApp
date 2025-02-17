import { body } from "express-validator";

export const createTodoValidationRules = () => [
  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is required and must be a non-empty string"),
  body("color")
    .isString()
    .notEmpty()
    .withMessage("Color is required and must be a non-empty string"),
  body("completed")
    .isBoolean()
    .optional()
    .withMessage("Completed must be a boolean"),
];

export const updateTodoValidationRules = () => [
  body("title")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Title must be a non-empty string"),
  body("color")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Color must be a non-empty string"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
];
