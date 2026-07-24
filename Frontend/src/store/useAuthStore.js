// as we are using zustand for state management, we can create a store to manage the authentication state so we dont have to pass the authentication state through props

import { create } from "zustand"; 
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000"; // as we are using vite for frontend, we can use import.meta.env to get the environment variables
export const useAuthStore = create((set,get) => ({
    authUser: null,
    isCheckingAuth: true, // as we are checking the authentication state when the app loads, we can set this to true initially
    isSigningUp: false, // as we are checking the authentication state when the app loads, we can set this to true initially
    isLoggingIn: false, // as we are checking the authentication state when the app loads, we can set this to true initially
    onlineUsers: [], // as we are checking the authentication state when the app loads, we can set this to true initially
    socket: null, // as we are checking the authentication state when the app loads, we can set this to true initially
    isUpdatingProfile: false, // as we are checking the authentication state when the app loads, we can set this to true initially
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({authUser: response.data, isCheckingAuth: false});
            get().connectSocket();

        } catch (error) {
            set({authUser: null, isCheckingAuth: false});
        }
    }, 
    signup: async (data) => {
        set({isSigningUp: true});
        try{
            const response = await axiosInstance.post("/auth/signup", data);
            toast.success("Signup successful");
            set({authUser: response.data, isSigningUp: false});
            get().connectSocket();
            return true;
            // here we are using .data because the response from the server is in the form of {data: user} and we want to set the authUser to the user object
            // it is in this form because we are using axios and axios wraps the response in a data object
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            return false;
        } finally {
            set({isSigningUp: false});
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            get().disconnectSocket();
            const { useChatStore } = await import('./useChatStore.js');
            useChatStore.getState().resetChat();
            set({authUser: null});
            toast.success("Logout successful");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        } 
    },
    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const response = await axiosInstance.post("/auth/login", data);
            set({authUser: response.data, isLoggingIn: false});
            toast.success("Login successful");
            get().connectSocket();
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            set({isLoggingIn: false});
            return false;
        }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const response = await axiosInstance.put("/auth/profile-pic", data);
            set({authUser: response.data, isUpdatingProfile: false});
            toast.success("Profile updated successfully");
            return true;
        } catch (error) {
            console.error("Profile update failed:", error);
            toast.error(error.response?.data?.message || "Profile update failed");
            set({isUpdatingProfile: false});
            return false;
        }
    },
    connectSocket: () => {
        const { authUser, socket: currentSocket } = get();
        if(!authUser || currentSocket?.connected) return; // if the user is not authenticated, we don't want to connect the socket
        const newSocket = io(BASE_URL, {
            withCredentials: true,
            query: { userId: authUser._id }, // we are sending the userId as a query parameter to the server so that the server can identify the user and add them to the online users list
        });
        set({socket: newSocket}); // set the socket in the store so that we can use it in other components
        newSocket.on('onlineUsers', (onlineUsers) => {
            set({onlineUsers}); // update the online users list in the store whenever the server emits the onlineUsers event
        });
    },
    disconnectSocket: () => {
        const { socket: currentSocket } = get();
        if (currentSocket?.connected) currentSocket.disconnect();
        set({ socket: null });
    }
    
}))