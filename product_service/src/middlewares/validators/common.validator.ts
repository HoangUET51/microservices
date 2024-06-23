import { param } from "express-validator";

export const validateId = (idParamName = "id") => {
  return [param(idParamName).isInt().withMessage(`${idParamName} is invalid`)];
};
