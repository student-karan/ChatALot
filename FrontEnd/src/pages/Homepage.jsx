import React from 'react'
import { ChatStore } from '../store/Chatstore.js';
import Sidebar from '../components/Sidebar.jsx';
import Chatcontainer from '../components/Chatcontainer.jsx';
import PlaceHolder from '../components/PlaceHolder.jsx';

const Homepage = () => {
  const { selectedUser } = ChatStore();
  return (
    <div className='min-h-screen w-full pt-16 flex justify-center items-center'>
      <div className='w-full lg:w-3/4 flex justify-center h-[calc(100vh-4rem)] lg:h-[calc(100vh-6rem)]'>
        <div className='flex bg-base-200 w-full rounded-lg'>
          <Sidebar />
          {selectedUser ? <Chatcontainer /> : <PlaceHolder />}
        </div>
      </div>

    </div>
  )
}

export default Homepage