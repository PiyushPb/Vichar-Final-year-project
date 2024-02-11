import User from "../models/userSchema.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_TOKEN,
    {
      expiresIn: "15d",
    }
  );
};

export const register = async (req, res) => {
  const { credientials, name, username, password } = req.body;

  try {
    let user = null;

    user = await User.findOne({ credientials, username });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
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
    res.status(500).json({
      success: false,
      message: "Internal server error, Try agai later :" + err,
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
