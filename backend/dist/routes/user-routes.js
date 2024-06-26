import { Router } from "express";
import { getAllUsers, userSignup, userLogin, verifyUser } from "../controllers/user-controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
const userRoutes = Router();
userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signupValidator), userSignup);
userRoutes.post('/login', validate(loginValidator), userLogin);
userRoutes.get('/auth-status', 
//  verifyToken,
verifyUser);
userRoutes.get("/logout", 
//  verifyToken,
verifyUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map