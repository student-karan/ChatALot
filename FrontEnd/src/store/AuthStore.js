import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "https://chatalot-ouh0.onrender.com";

export const AuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  online_users: [],
  socket: null,
  checkAuth: async () => {
    set({isCheckingAuth : true});
    try {
      let res = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.log(err.response?.data || "Not authenticated");
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  // In authstore.js - update all catch blocks:

  signup: async (values) => {
    set({ isSigningUp: true });
    try {
      let res = await axiosInstance.post("/auth/signup", values);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (err) {
      toast.error(err.response?.data|| "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (values) => {
    set({ isLoggingIn: true });
    try {
      let res = await axiosInstance.post("/auth/login", values);
      set({ authUser: res.data });
      toast.success(`Welcome Back ${res.data.fullName}`);
      get().connectSocket();
    } catch (err) {
      toast.error(err.response?.data || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      let res = await axiosInstance.get("/auth/logOut");
      set({ authUser: null });
      toast.success(res.data);
      get().disconnectSocket();
    } catch (err) {
      toast.error(err.response?.data || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      let res = await axiosInstance.put("/auth/updateProfile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ authUser: res.data });
      toast.success("your profile picture is Updated");
    } catch (err) {
      toast.error(err.response?.data || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (onlineUsers) => {
      set({ online_users: onlineUsers });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
