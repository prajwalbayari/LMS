import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { userName, userEmail, password, role } = req.body;

  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Username or password already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    userEmail,
    role,
    password: hashedPassword,
  });
  await newUser.save();
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};
