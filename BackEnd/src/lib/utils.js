import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
   const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })

   res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // XSS Protection
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF Protection
      secure: process.env.NODE_ENV !== "development" 
   })

   return token;
}

export function asyncWrap(fn) {
   return function (req, res, next) {
      fn(req, res, next).catch((err) => next(err));
   }
}