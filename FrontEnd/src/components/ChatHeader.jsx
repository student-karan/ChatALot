import { X } from 'lucide-react';
import { ChatStore } from '../store/Chatstore.js';
import { AuthStore } from '../store/AuthStore.js';
const ChatHeader = ({ user }) => {
    const { online_users } = AuthStore();
    const {setSelectedUser} = ChatStore();
    return (
        <div className='relative w-full p-2 '>
            <div className='flex gap-2 items-center'>
                <img src={user.profilePic ? user.profilePic : "/user.png"}
                    className='size-10 object-cover rounded-full ' alt={user.fullName} />
                <div>
                    <span className='font-medium'>{user.fullName}</span>
                    <p className='text-gray-400'>{online_users.includes(user._id) ? "Online" : "Offline"}</p>
                </div>
            </div>
            <X className='absolute top-3 right-3 size-8 cursor-pointer hover:bg-base-300 p-1 rounded-full' onClick={()=>setSelectedUser(null)}/>
        </div>
    )
}

export default ChatHeader