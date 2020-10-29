export {};

const { check, validationResult } = require("express-validator");

exports.validateCreatePost = [
  check("title")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Title can not be empty!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Maximum of 255 characters!")
    .bail(),
  check("content")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Content can not be empty!")
    .bail(),
  (req, res, next) => {
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

exports.validateDeletePost = (req, res, next) => {
  if (!req.user.id) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  next();
};

exports.validateEditPost = [
  check("title")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Title can not be empty!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Maximum of 255 characters!")
    .bail(),
  check("content")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Content can not be empty!")
    .bail(),
  (req, res, next) => {
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
