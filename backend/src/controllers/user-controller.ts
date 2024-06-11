import User from "../models/User.js";
import { NextFunction, Request, Response } from "express";
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get all user
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
