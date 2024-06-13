import mongoose from "mongoose";
import User from "../models/userSchema.js";
export const updateUser = async (req, res, next) => {
  const { name, email, phone, website } = req.body;

  try {
    if (!name || !email || !phone || !website) {
      return next("Please provide all required fields");
    }

    // Extract userId from req.body.user set by the middleware
    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No User with id: ${id}`);
    }

    const updateUser = { name, email, phone, website, _id: id };

    const user = await User.findByIdAndUpdate(id, updateUser, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = user.createJWT();

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
  
  export const getUser = async (req, res, next) => {
    try {
      const id = req.body.user.userId;
  
      const user = await User.findById({ _id: id });
  
      if (!user) {
        return res.status(200).send({
          message: "User Not Found",
          success: false,
        });
      }
  
      user.password = undefined;
  
      res.status(200).json({
        success: true,
        user: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "auth error",
        success: false,
        error: error.message,
      });
    }
  };
  export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password'); // Exclude password

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success: false,
            error: error.message,
        });
    }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No User with id: ${id}`);
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
