import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { useAuthStore } from '../store/useAuthStore.js'
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import MessageSkeleton from './MessageSkeleton.jsx';
const ChatContainer = () => {
    const { authUser } = useAuthStore();
    const messagesEndRef = useRef(null);
    const { messages, getMessages, selectedUser, isMessagesLoading, subscribeToMessages } = useChatStore();
    useEffect(() => {
        getMessages(selectedUser._id);
    }, [selectedUser._id, getMessages]);

    useEffect(() => {
        const unsubscribe = subscribeToMessages();
        return unsubscribe;
    }, [selectedUser._id, subscribeToMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if(isMessagesLoading) return <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
    </div>
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
              <ChatHeader />
        <div className="flex-1 flex flex-col overflow-auto">
            {messages.map((message, index) => (
                <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} ref={index === messages.length - 1 ? messagesEndRef : null}>
                    <div className='chat-image avatar'>
                        <div className='size-10 rounded-full'>
                            <img src={message.senderId === authUser._id ? authUser.profilePic || '/avatar.png' : selectedUser.profilePic || '/avatar.png'} alt={message.senderId === authUser._id ? authUser.fullName : selectedUser.fullName} />
                        </div>
                    </div>
                    <div className='chat-header mb-1'>
                        <time className='text-xs text-base-content/70'>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                    </div>
                    <div className='chat-bubble'>
                        {message.text}
                        {message.image && (
                            <img src={message.image} alt="Image" className="mt-2 max-w-full h-auto" />
                        )}
                    </div>
                </div>
            ))}
        </div>
        <MessageInput />
    </div>
  )
}

export default ChatContainer