import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore.js';

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get('/message/users');
            set({ users: response.data, isUsersLoading: false });
        } catch (error) {
            toast.error('Failed to fetch users');
            set({ isUsersLoading: false });
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/message/${userId}`);
            set({ messages: response.data, isMessagesLoading: false });
        } catch (error) {
            toast.error('Failed to fetch messages');
            set({ isMessagesLoading: false });
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const response = await axiosInstance.post(`/message/${selectedUser._id}`, messageData);
            set({ messages: [...messages, response.data] });
        } catch (error) {
            toast.error('Failed to send message');
        }
    },
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const currentSocket = useAuthStore.getState().socket;
        const handleNewMessage = (newMessage) => {
            if (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id) {
                set((state) => ({ messages: [...state.messages, newMessage] }));
            }
        };

        currentSocket?.on('newMessage', handleNewMessage);

        return () => currentSocket?.off('newMessage', handleNewMessage);
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    resetChat: () => set({ messages: [], users: [], selectedUser: null, isUsersLoading: false, isMessagesLoading: false }),
}));