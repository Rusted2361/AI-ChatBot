import { body, validationResult } from "express-validator";
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            await validation.run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // If there are errors, send them back in the response
                return res.status(422).json({ errors: errors.array() });
            }
        }
        // If all validations pass, proceed to the next middleware
        next();
    };
};
const loginValidator = [
    body("email").trim().isEmail().withMessage("Invalid email format"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("password should at least have 6 characters"),
];
const signupValidator = [
    body("name").not().isEmpty().withMessage("name is required"),
    ...loginValidator,
    //   body("email").trim().isEmail().withMessage("Invalid email format"),
    //   body("password")
    //     .trim()
    //     .isLength({ min: 6 })
    //     .withMessage("password should at least have 6 characters"),
];
const chatCompletionValidator = [
    body("message").notEmpty().withMessage("message is required"),
];
export { validate, signupValidator, loginValidator, chatCompletionValidator };
//# sourceMappingURL=validators.js.map