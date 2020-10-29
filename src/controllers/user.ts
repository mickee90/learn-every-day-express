import { User } from "../models/User";
const passwordUtils = require("../utils/passwordUtils");
const fileUtils = require("../utils/fileUtils");
import { Request, Response } from "express";

exports.getUser = async (req: Request, res: Response) => {
  const user = apiUserObject(req.user);

  res.status(200).json({ user });
};

exports.editUser = async (req: Request, res: Response, next) => {
  try {
    const user: User = await User.findByPk(req.user.id);

    if (!user) {
      const error = new Error("The user cannot be found");
      error.statusCode = 404;
      throw error;
    }

    user.username = req.body.username;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.address = req.body.address;
    user.zip_code = req.body.zip_code;
    user.city = req.body.city;
    user.phone = req.body.phone;
    user.country_id = req.body.country_id || user.country_id;

    const savedUser = await user.save();

    if (!savedUser) {
      const error = new Error("The user could not be updated");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({ user: apiUserObject(user) });
  } catch (error) {
    next(error);
  }
};

// TODO: Validate, password check, trim
exports.editPassword = async (req: Request, res: Response, next) => {
  if (!req.user.id) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  if (!req.body.password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (!req.body.confirm_password) {
    return res.status(400).json({ message: "Confirm the password" });
  }

  if (req.body.password.length < 3) {
    return res
      .status(400)
      .json({ message: "The password needs to be at least 3 characters" });
  }

  if (req.body.password !== req.body.confirm_password) {
    return res.status(400).json({ message: "The passwords must match" });
  }

  try {
    const user: User = await User.findByPk(req.user.id);

    if (!user) {
      const error = new Error("The user cannot be found");
      error.statusCode = 404;
      throw error;
    }

    user.password = passwordUtils.generateHash(req.body.password);

    const savedUser = await user.save();

    if (!savedUser) {
      const error = new Error("The user could not be updated");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({ user: apiUserObject(user) });
  } catch (error) {
    next(error);
  }
};

exports.uploadAvatar = async (req: Request, res: Response, next) => {
  try {
    const user: User = await User.findByPk(req.user.id);

    if (!user) {
      const error = new Error("The user cannot be found");
      error.statusCode = 404;
      throw error;
    }

    if (!req.file) {
      const error = new Error("'No file uploaded");
      error.statusCode = 404;
      throw error;
    }

    const deleteFile = fileUtils.deleteFile(user.avatar);
    if (!deleteFile) {
      const error = new Error("The avatar could not be deleted");
      error.statusCode = 500;
      throw error;
    }

    user.avatar = req.file.filename;

    const savedUser = await user.save();

    if (!savedUser) {
      const error = new Error("The user could not be updated");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({ user: apiUserObject(user) });
  } catch (error) {
    next(error);
  }
};

function apiUserObject(user) {
  return {
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    address: user.address || "",
    zip_code: user.zip_code || "",
    city: user.city || "",
    email: user.email,
    phone: user.phone || "",
    country_id: user.country_id || 1,
    avatar: user.avatar || "",
  };
}
