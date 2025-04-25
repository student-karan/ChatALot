import joi from "joi";
import ExpressError from "../ExpressError.js";
import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

const UserSchema = joi.object({
    email: joi.string().required(),
    fullName: joi.string().required(),
    password: joi.string().required().min(8),
    profilePic: joi.string().allow("", null)
})

export const ValidateUser = (req, res, next) => {
    let result = UserSchema.validate(req.body);
    if (result.error) {
        next(new ExpressError(404, result.error))
    }
    else {
        next();
    }
}

export const isLoggedin = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            throw new ExpressError(401, "Unauthorized - No token Provided");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new ExpressError(401, "Unauthorized - Invalid Token");
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            throw new ExpressError(404, "User not found");
        }
        req.user = user;
        next();
    } catch (err) {
       console.log(err.message);
       next(err);
    }
}