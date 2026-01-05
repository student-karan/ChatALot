import express from "express";
import { isLoggedin } from "../middlewares/auth_middleware.js";
import { get_chats, get_Users_on_sidebar, sendMessages } from "../controllers/message_controller.js";
import { asyncWrap } from "../lib/utils.js";
const router = express.Router();
import {upload} from "./../middlewares/multer_middleware.js";

// get all users on sidebar
router.get("/users",isLoggedin,asyncWrap(get_Users_on_sidebar));

// personal chats with one particular user
router.get("/:id",isLoggedin,asyncWrap(get_chats));

// route to send messages
router.post("/:id/send",isLoggedin,upload.single('image'),asyncWrap(sendMessages));

export default router;