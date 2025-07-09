import React from 'react'
import { MessageSquare } from 'lucide-react'
const PlaceHolder = () => {
    return (
        <div className='w-full flex justify-center items-center bg-base-100/50'>
            <div className='flex flex-col items-center gap-2'>
                <div className='size-12 bg-primary/10 grid place-items-center animate-bounce rounded-lg transition-colors'>
                    <MessageSquare className='size-8 font-semibold text-primary' />
                </div>
                <h1 className='text-xl font-semibold'>Welcome to ChatALot!</h1>
                <p className='text-sm font-medium'>Select a conversation from the sidebar to start chatting</p>
            </div>
        </div>
    )
}

export default PlaceHolder