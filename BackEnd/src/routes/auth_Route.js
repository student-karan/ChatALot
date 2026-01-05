import express from "express";
const router = express.Router();
import {logout, signupPost, loginPost,updateProfile, checkAuth} from "../controllers/auth_Controller.js";
import { ValidateUser,isLoggedin } from "../middlewares/auth_middleware.js";
import { asyncWrap } from "../lib/utils.js";
import {upload} from "./../middlewares/multer_middleware.js";

//Signup
router.post("/signup",ValidateUser,asyncWrap(signupPost));

//login
router.post("/login",asyncWrap(loginPost));

//logout
router.get("/logOut",asyncWrap(logout));

//update-Profile
router.put("/updateProfile",isLoggedin,upload.single('profilePic'),asyncWrap(updateProfile));

router.get("/checkAuth",isLoggedin,asyncWrap(checkAuth));

export default router;