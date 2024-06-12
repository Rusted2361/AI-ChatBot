import User from "../models/User.js";
import { hash, compare } from "bcrypt";
export const getAllUsers = async (req, res, next) => {
    //get all user
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const userSignup = async (req, res, next) => {
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
        return res.status(201).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const userLogin = async (req, res, next) => {
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
        return res.status(200).json({ message: "OK", id: user.name.toString() });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
//# sourceMappingURL=user-controller.js.map