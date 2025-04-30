import User from "../models/user_model.js";
import Message from "../models/message_model.js"
import { recieverSocketId, io } from "../lib/socket.js";

export const get_Users_on_sidebar = async (req, res) => {
    const myId = req.user._id;
    const users = await User.find({ _id: { $ne: myId } }).select("-password");

    res.status(200).send(users);
}

export const get_chats = async (req, res) => {
    let { id: UsertoChatId } = req.params;
    const myId = req.user._id;
    let messages = await Message.find({
        $or: [
            { senderId: myId, recieverId: UsertoChatId },
            { senderId: UsertoChatId, recieverId: myId }
        ]
    });
    res.status(200).send(messages);
}

export const sendMessages = async (req, res) => {
    let { id:recieverId } = req.params;
    let senderId = req.user._id;
    let { text } = req.body;
    let imageUrl = req.file?.path; //will be undefined if no file in request body
    if (!text && !imageUrl) return;
    let message = new Message({ senderId, recieverId, text, image: imageUrl });
    await message.save();
    //todo : realtime functionality => socket.io
    const recieverSocket_id = recieverSocketId(recieverId);
    if (recieverSocket_id) {
        io.to(recieverSocket_id).emit("newMessage", message);
    }

    res.status(201).send(message);
}