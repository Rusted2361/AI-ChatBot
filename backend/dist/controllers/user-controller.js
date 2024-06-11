import User from "../models/User.js";
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
//# sourceMappingURL=user-controller.js.map