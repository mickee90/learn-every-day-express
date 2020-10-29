export {};

const { check, validationResult } = require("express-validator");
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";

const validateUserValues = [
  check("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Username is required!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Maximum of 255 characters!")
    .bail()
    .isEmail()
    .normalizeEmail()
    .bail()
    .custom((value, { req }) => {
      return User.findOne({ where: { username: value } }).then((user) => {
        if (user && user.id !== req.user.id) {
          return Promise.reject("Username does already exists");
        }
      });
    })
    .bail(),
  check("first_name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("First name is required!")
    .bail(),
  check("last_name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Last name is required!")
    .bail(),
  check("email")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Maximum of 255 characters!")
    .bail()
    .isEmail()
    .normalizeEmail()
    .bail()
    .custom((value, { req }) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user && user.id !== req.user.id) {
          return Promise.reject("Email does already exists");
        }
      });
    })
    .bail(),
];

const validatePassword = [
  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum of 3 characters!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Maximum of 255 characters!")
    .bail(),
  check("confirm_password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }

      return true;
    })
    .bail(),
];

exports.validateEditUser = [
  ...validateUserValues,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!req.user.id) {
      errors["user_id"] = "Something went wrong";
    }

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

exports.validateRegisterUser = [
  ...validateUserValues,
  ...validatePassword,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

exports.validateChangePassword = [
  ...validatePassword,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!req.user.id) {
      errors["user_id"] = "Something went wrong";
    }

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];
