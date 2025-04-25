import React, { useState } from 'react'
import { AuthStore } from '../store/AuthStore.js';
import { Camera, LoaderCircle, User2, Mail } from "lucide-react";
import toast from 'react-hot-toast';
const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = AuthStore();

  function handlefileChange(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    const maxSizeMB = 10;
    const maxSizeKB = 1024 * maxSizeMB;
    if(file.size/1024 > maxSizeKB){
      toast.error("Image selected exceed the size limit of 10MB");
      return;
    }
    updateProfile({profilePic:file});
  }
  return (
    <div className='flex items-center justify-center min-h-screen pt-8 w-full'>
      <div className='mx-auto p-4 max-w-md min-w-[300px] md:size-1/2 mt-10 rounded-lg bg-base-300'>
        <div className='w-full text-center'>
          <h1 className='font-bold text-2xl'>Account</h1>
          <p className='mb-2 font-semibold'>Your profile information</p>
        </div>
        <div className='flex flex-col items-center gap-6'>
          <div className='relative'>
            <img src={authUser.profilePic || "/user.png"} className='size-32 p-1 rounded-full object-cover border-4 border-gray-400' />
          <label htmlFor="avatar" className='cursor-pointer p-2 rounded-full bg-gray-700 text-white absolute bottom-0 right-0'>
            {isUpdatingProfile ? <LoaderCircle className='animate-spin text-md size-5' /> :<Camera className='size-5' />}
          </label>
          <input type="file" id='avatar' name='profilePic' className='hidden' disabled={isUpdatingProfile} onChange={handlefileChange} />
          </div>
          <p className='text-sm text-center'>
          Click the camera icon to update your Photo
          </p>
          <div className='self-start w-full mb-2'>
            {/* fullname */}
            <label htmlFor="fullname" className='text-sm block mb-1'>Full Name</label>
            <div className='mb-4 w-full relative'>
              <input type="text" className='input outline-none border-none w-full pl-9' readOnly value={authUser.fullName} />
              <User2 className='absolute top-3 left-2 size-6 text-gray-500' />
            </div>
            {/* email */}
            <label htmlFor="email" className='text-sm block mb-1 '>Email</label>
            <div className='mb-4 w-full relative'>
              <input type="text" className='input  outline-none border-none w-full pl-9' readOnly value={authUser.email} />
              <Mail className='absolute top-3 left-2 size-6 text-gray-500' />
            </div>
            {/* Account info */}
            <div className='w-full mt-4'>
              <h1 className=' text-lg sm:text-md'>Account Information</h1>
              <div className='w-full px-2 my-2 flex items-center justify-between'>
                <p className='text-sm '>Member Since</p>
                <p className='text-sm '>{authUser.createdAt.split("T")[0]}</p>
              </div>
              <hr />
              <div className='w-full px-2 mt-2 flex items-center justify-between'>
                <p className='text-sm '>Account Status</p>
                <p className='text-sm text-green-500'>Active</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage