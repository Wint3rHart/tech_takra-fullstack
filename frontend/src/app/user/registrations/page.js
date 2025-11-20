import React from 'react';
import UserBookings from './user_bookings';

const Page = () => {
    return (
        <div className='md:mt-36 flex flex-col justify-center items-center'>
            <h1 className='font-cinzel text-[#d4af37] text-3xl font-bold mt-6 lg:mt-0
                          drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]'>Registration Forms</h1>
           <UserBookings/>
        </div>
    );
}

export default Page;
