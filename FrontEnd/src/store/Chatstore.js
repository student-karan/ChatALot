import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { AuthStore } from "./AuthStore.js";
export const ChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,
    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            let res = await axiosInstance.get("/message/users");
            set({ users: res.data });
        } catch (err) {
            console.log(err);
        } finally {
            set({ isUsersLoading: false })
        }
    },
    getMessages: async (userid) => {
        set({ isMessageLoading: true })
        try {
            let res = await axiosInstance.get(`/message/${userid}`);
            set({ messages: res.data });
        } catch (err) {
            toast(err.response.data);
        } finally {
            set({ isMessageLoading: false })
        }
    },
    sendMessages: async (messagedata) => {
        const { selectedUser, messages } = get();
        try {
            let res = await axiosInstance.post(`/message/${selectedUser._id}/send`, messagedata, { headers: { 'Content-Type': 'multipart/form-data' } });
            set({ messages: [...messages, res.data] });
            console.log(res.data);
            toast.success("Message Sent");
        } catch (err) {
            toast.error(err.response.data);
        }
    },
    subscribetoMessages: () => {
        const { selectedUser, messages } = get();
        const  socket  = AuthStore.getState().socket;
        if (!selectedUser) return;

        socket.on("newMessage", (message) => {
            if(message.senderId !== selectedUser._id) return; // to make sure the message goes to the ones it was meant for, not any other guy
            set({ messages: [...messages, message] });
        })
    },
    unsubscribetoMessages: ()=>{
        const  socket  = AuthStore.getState().socket;
        socket.off('newMessage');
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
})) 