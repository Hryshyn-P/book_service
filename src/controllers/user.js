import jwt from "jsonwebtoken";
import v from "validator";
import User from "../models/user.js";

// login
export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.checkPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

// registration
export const userRegistration = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    if (username && email && password && v.isAlphanumeric(username) && v.isEmail(email)) {
      const newUser = new User({ username, email });
      newUser.setPassword(password);
      await newUser.save();
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          message: "Registration successful",
        },
      });
    } else {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing or invalid required fields: username, email, password",
        data: "Bad request",
      });
    }
  } catch (error) {
    next(error);
  }
};

// user list
export const getUserList = (req, res) => {
  const { username } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      message: `Authorization was successful: ${username}`,
    },
  });
};
