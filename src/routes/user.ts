const userController = require("../controllers/user");
const {
  validateEditUser,
  validateChangePassword,
} = require("../validators/user");

const userRoutes = require("express").Router();

import * as path from "path";
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../uploads/avatars"));
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const shallStore =
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
      ? true
      : false;
  callback(null, shallStore);
};
const uploadAvatar = multer({ storage: fileStorage, fileFilter }).single(
  "avatar"
);
// console.log(path.join(__dirname, "images"))

userRoutes.get("/", userController.getUser);
userRoutes.put("/", validateEditUser, userController.editUser);
userRoutes.post(
  "/editPassword",
  validateChangePassword,
  userController.editPassword
);
userRoutes.post("/avatar", uploadAvatar, userController.uploadAvatar);

module.exports = userRoutes;
