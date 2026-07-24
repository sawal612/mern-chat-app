import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useChatStore } from '../store/useChatStore.js'
import Sidebar from '../components/Sidebar.jsx'
import ChatContainer from '../components/ChatContainer.jsx'
import NoChatSelected from '../components/NoChatSelected.jsx'

const HomePage = () => {
    const { authUser} = useAuthStore()
    const { selectedUser } = useChatStore()
  
  return (
    <div className='min-h-screen bg-base-200 pt-16'>
      <div className='flex items-center justify-center h-[calc(100vh-4rem)]'>
        <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-full p-4'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage