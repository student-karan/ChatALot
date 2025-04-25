import React, { useEffect, useRef } from 'react'
import { ChatStore } from '../store/Chatstore'
import MessageSkeleton from './skeletons/MessageSkeleton';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import { AuthStore } from '../store/AuthStore';
import { formatMessageTime } from '../lib/utils.js';
const Chatcontainer = () => {
  const { messages, selectedUser, isMessageLoading, getMessages, subscribetoMessages, unsubscribetoMessages } = ChatStore();
  const { authUser } = AuthStore();
  const chatBodyRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser])

  useEffect(() => {
    subscribetoMessages();
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
    return ()=>unsubscribetoMessages();
  }, [messages])

  if (isMessageLoading) return (
    <div className='w-full flex flex-col overflow-y-auto bg-base-100/50'>
      <ChatHeader user={selectedUser} />
      <MessageSkeleton />
      <ChatInput />
    </div>
  )

  return (
    <div className='w-full flex flex-col  bg-base-100/50'>
      <ChatHeader user={selectedUser} close_connection ={unsubscribetoMessages} />
      <div className='w-full flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth' ref={chatBodyRef}>
        {messages.map((message, idx) => (
          <div key={idx} className={`chat ${message.senderId == authUser._id ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                <img src={message.senderId == authUser._id ? authUser.profilePic || "/user.png" : selectedUser.profilePic || "/user.png"} alt="user image" />
              </div>
            </div>

            <div className="chat-header mb-1">
              <p className='text-xs opacity-50'>{formatMessageTime(message.createdAt)}</p>
            </div>

            <div className="chat-bubble bg-base-300 p-1">
              <div className='p-1'>
                {message.image && <img src={message.image} className='object-cover rounded-lg mb-2 max-w-[200px]' alt='image' />}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          </div>
        ))}

      </div>
      <ChatInput />
    </div>
  )
}

export default Chatcontainer