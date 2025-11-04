import { useEffect, useState } from 'react'
import { ChatStore } from '../store/Chatstore.js';
import { AuthStore } from '../store/AuthStore.js';
import { Users } from 'lucide-react';
import SidebarSkeleton from './skeletons/SidebarSkeleton.jsx';
const Sidebar = () => {
    const { selectedUser, setSelectedUser, users, isUsersLoading, getUsers } = ChatStore();
    const {online_users} = AuthStore();
    const [online,setOnline] = useState(false);
    useEffect(() => {
        getUsers();
    }, [getUsers])
    const filterUsers = online ? users.filter((user)=>{return online_users.includes(user._id)}) : users;

    if (isUsersLoading) return <SidebarSkeleton />
    return (
        <div className='h-full w-20 md:w-80 border-r border-base-300 flex flex-col gap-2'>
            <div className='w-full flex flex-col items-start gap-1 border-b border-base-300 flex-shrink-0 py-2 px-2'>
                {/* status */}
                <div className='flex justify-start ml-1 gap-1 '>
                    <Users className=' size-7' />
                    <span className='text-xl font-medium hidden md:block'>Contacts</span>
                </div>
                <div className="lg:flex flex-row hidden items-center">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="checkbox size-5 checkbox-base-200" checked={online} onChange={()=>setOnline(!online)} />
                        <span className="label-text text-sm text-primary w-full text-center hidden md:inline ml-2">Show online only</span>
                    </label>
                    <span className='text-sm text-zinc-500'>( {(online_users.length -1)}  online )</span>
                </div>
            </div>
            {/* Users */}
            <div className='flex flex-col overflow-y-auto w-full py-3'>
                {filterUsers.length==0 && <p className='ml-2 text-lg text-gray-500'>No Online Users</p>}
                {filterUsers.map((user) => (
                    <div key={user._id}
                        className={` flex items-center px-4 py-2 w-full cursor-pointer hover:bg-base-300
                            ${selectedUser?._id == user._id && "bg-base-300 ring-1 ring-base-300"}`}
                        onClick={() => setSelectedUser(user)}>
                        <span className='relative'>
                            <img src={user.profilePic ? user.profilePic : "./user.png"} alt="profile photo"
                                className='size-10 object-cover rounded-full mr-2' />
                                {online_users.includes(user._id) && <span className='absolute size-3 top-0 right-2 bg-green-500 rounded-lg'></span> }
                        </span>
                        <div className='ml-2 hidden md:block'>
                            <h1 className='text-md lg:text-lg truncate text-primary font-medium'>{user.fullName}</h1>
                            <p className={`text-sm truncate ${online_users.includes(user._id) ? "text-green-400" : "text-gray-400"}`}
                            >{online_users.includes(user._id) ? "Online" : "Offline"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar