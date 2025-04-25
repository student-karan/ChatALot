import { generateToken } from "../lib/utils.js";
import User from "../models/user_model.js";
import bcrypt from "bcrypt";
import ExpressError from "../ExpressError.js";

export const signupPost = async (req, res, next) => {
    const { email, fullName, password } = req.body;

    const user = await User.findOne({ email: email });
    // if user already exists
    if (user) {
        throw new ExpressError(400, "User with these details already exists");
    }
    const Salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, Salt);

    const newUser = new User({
        email,
        fullName,
        password: hashPassword
    });

    if (newUser) {
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(200).send(newUser);
    }
    else {
        throw new ExpressError(400, "Invalid user data")
    }
}

export const loginPost = async (req, res, next) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (user && isPasswordCorrect) {
        generateToken(user._id, res);
        res.status(200).send(user);
    } else {
        throw new ExpressError(400, "Invalid Credentials");
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", { maxAge: 0 })
    res.status(200).send("User successfully logged out.");
}

export const updateProfile = async (req, res) => {
    const profilePic  = req.file.path;
    const userId = req.user._id;
    if (!profilePic) {
        throw new ExpressError(400, "Profile Pic is Required");
    }
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: { profilePic: profilePic } }, 
    { new: true, runValidators: true })
    res.status(200).send(updatedUser);
}
export const checkAuth = async (req, res) => {
    res.status(200).send(req.user);
}