import User from "../models/userSchema.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_TOKEN,
    {
      expiresIn: "15d",
    }
  );
};

const generateForgetPassToken = (credential) => {
  return crypto.randomBytes(20).toString("hex");
};

export const register = async (req, res) => {
  const { credientials, name, username, password } = req.body;

  try {
    let user = null;

    let existingUser = await User.findOne({
      username: username,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already in use.",
      });
    }

    let existingCreds = await User.findOne({
      credientials: credientials,
    });

    if (existingCreds) {
      return res.status(400).json({
        success: false,
        message: "Email / Phone already in use.",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new User({
      credientials,
      name,
      username,
      password: hashPassword,
    });

    await user.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error, Try again later.",
    });
  }
};

export const login = async (req, res) => {
  const { credientials } = req.body;

  try {
    let user = null;

    user = await User.findOne({ credientials });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid username or password." });
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password." });
    }

    //generate token
    const token = generateToken(user);

    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      data: {
        ...rest,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error, Try again later :" + err,
    });
  }
};

export const forgetPassword = async (req, res) => {
  const url = process.env.SERVER_URL;

  const { credientials } = req.body;

  try {
    let user = null;
    user = await User.findOne({ credientials: credientials });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "No user found, please try with different credentials!",
      });
    }

    // Reset token and expiry
    const resetToken = generateForgetPassToken();
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() - 1.2);

    //store token and expiry in db
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetLink = `${url}v1/auth/resetPassword/${user.id}/${resetToken}`;
    console.log(resetLink);
    // TODO: ADD SEND FORGET PASSWORD EMAIL FUNCTION TO USER.

    res.status(200).json({
      status: true,
      message: "Forget link send successfully to registered Email address.",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error please try again later : " + err,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { id, resetToken } = req.params;

  try {
    let user = null;

    // console.log(id);

    user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "No user found, please try with different credentials!",
      });
    }

    if (resetToken !== user.resetToken) {
      return res.status(400).json({
        status: false,
        message: "Invalid token!",
      });
    }

    const currentDateTime = new Date();
    const resetTokenExpiry = new Date(user.resetTokenExpiry).getTime(); // Convert to milliseconds
    const expirationDuration = 1 * 60 * 60 * 1000;

    if (resetTokenExpiry - currentDateTime < expirationDuration) {
      // TODO: update this with try-catch block
      try {
        await User.updateOne(
          { _id: id },
          { $unset: { resetToken: "", resetTokenExpiry: "" } }
        );

        return res.status(400).json({
          status: false,
          message: "Reset token has expired!",
        });
      } catch (err) {
        console.error("Error updating document:", err);
      }

      return res.status(400).json({
        status: false,
        message: "Reset token has expired!",
      });
    }

    res.send(user);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error, please try again later!",
    });
  }
};
