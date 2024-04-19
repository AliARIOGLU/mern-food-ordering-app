import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateUserRequest = [
  body("name").isString().exists().withMessage("Name is required"),
  body("addressLine1")
    .isString()
    .exists()
    .withMessage("AddressLine1 is required"),
  body("country").isString().exists().withMessage("Country is required"),
  body("city").isString().exists().withMessage("City is required"),
  handleValidationErrors,
];
