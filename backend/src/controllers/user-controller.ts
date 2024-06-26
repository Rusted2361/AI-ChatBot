import User from "../models/User.js";
import { createToken } from "../utils/token-manager.js";
import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { COOKIE_NAME } from "../utils/constants.js";

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

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get all user
  try {
    //take values from request
    const { name, email, password } = req.body;
    //find user by email
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(409).json({ message: "User already exists" });
    }
    //hash password
    const hashedPassword = await hash(password, 10);
    //create new user
    const user = new User({ name, email, password: hashedPassword });
    //and store in database
    await user.save();
    //remove cookie
    res.clearCookie(COOKIE_NAME,{
      domain: "localhost", 
      httpOnly: true,
      signed: true,
      path:"/",
      });
    //create token and store in cookie
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires=new Date();
    expires.setDate(expires.getDate()+7);
    res.cookie(COOKIE_NAME,token,{
      path:"/", 
      domain: "localhost", 
      expires,
      httpOnly: true,
      signed: true,
      }
    );
    return res.status(201).json({ message: "OK", id: user._id.toString() });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get all user
  try {
    //take values from request
    const { email, password } = req.body;
    //find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    //compare password
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return res.status(403).json({ message: "Invalid password" });
    }

    res.clearCookie(COOKIE_NAME,{
      domain: "localhost", 
      // httpOnly: true,
      signed: true,
      path:"/",
      });

    //create token
    const token = createToken(user._id.toString(), user.email, "1y");
    // const expires=new Date();
    const expires = new Date(); expires.setFullYear(expires.getFullYear() + 1);
    
    res.cookie(COOKIE_NAME,token,{
      path:"/", 
      domain: "localhost", 
      expires,
      // httpOnly: true,
      // signed: true,
      // sameSite: false,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000,
      }
    );
    
    return res.status(200).json({ message: "OK", id: user.name.toString() });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};