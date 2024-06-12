// import { Request, Response, NextFunction } from "express";
// import { ValidationChain, body, validationResult } from "express-validator";

// const validate = (validations: ValidationChain[])=>{
//     return async (req: Request, res: Response, next: NextFunction) => {
//         for (let validation of validations) {
//             const result = await validation.run(req);
//             if (!result.isEmpty()) {
//                 break;
//             }
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return next();
//             }
//             return res.status(422).json({ errors: errors.array() });
//         }
//     };
// }
// const signupValidator = [
//   body("name").isEmpty().withMessage("name is required"),
//   body("email").trim().isEmail().withMessage("email is required"),
//   body("password")
//     .trim()
//     .isLength({ min: 6 })
//     .withMessage("password should atleast have 6 characters"),
// ];

// export { validate, signupValidator };

import { Request, Response, NextFunction } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
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

export { validate, signupValidator, loginValidator };