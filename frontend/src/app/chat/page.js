"use client"

import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import {socket} from "../../setup/socket-io"
import usePost from '@/client_hooks/usePost';


const Page = () => {
   
  return (
    <div className='relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden'>
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400/40 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-amber-300/30 rounded-full animate-ping delay-700"></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-amber-400/30 rounded-full animate-ping delay-1000"></div>
      
      <Chat_box />
    </div>
  );
};

export default Page;

const Chat_box = () => {

  let [msg, setMsg] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
const {abort_ref,post}=usePost("msg","POST");
const {data,isSuccess,error,isPending,mutate}=post;




useEffect(()=>{console.log(inputValue);
},[inputValue])


  // useEffect(() => {
  //   if(!socket.connected){ console.log("connecting socket");
  //   ;socket.connect();}
  //   socket.on("welcome_msg", (data) => {
  //     msg_fnx(data);
  //   });
  // }, []);

  // const handleSend = (x) => {
  // console.log(x);
  // ;
  //  socket.emit("message",{msg:x})
  // };

  return (
    <div className='relative flex items-center justify-center min-h-screen p-6'>
      <div className='w-full max-w-2xl'>
        {/* Header */}
        <div className='text-center mb-8 animate-fade-in'>
          <h1 className='text-5xl font-bold text-amber-400 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] mb-2 tracking-wide'>
            THE WANDERING HART
          </h1>
          <p className='text-gray-400 text-sm tracking-widest'>CHAT EXPERIENCE</p>
        </div>

        {/* Chat Container */}
        <div className='relative backdrop-blur-xl bg-gray-800/40 border border-amber-400/20 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.1)] overflow-hidden'>
          {/* Gradient overlay effect */}
          <div className='absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-gray-900/20 pointer-events-none'></div>
          
          {/* Chat messages area */}
          <div className='relative h-[60vh] overflow-y-auto px-6 py-8 space-y-4 scrollbar-thin scrollbar-thumb-amber-400/30 scrollbar-track-transparent'>
            {msg.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full text-gray-500'>
                <div className='w-16 h-16 border-2 border-amber-400/20 rounded-full flex items-center justify-center mb-4'>
                  <svg className='w-8 h-8 text-amber-400/40' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                  </svg>
                </div>
                <p className='text-lg font-light'>No messages yet</p>
                <p className='text-sm text-gray-600 mt-2'>Start a conversation</p>
              </div>
            ) : (
              msg.map((x, i) => (
                <div 
                  key={x.id || i}
                  className='group animate-slide-in'
                  style={{animationDelay: `${i * 0.05}s`}}
                >
                  <div className='flex items-start space-x-3'>
                    {/* Avatar */}
                    <div className='flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-400/30'>
                      <span className='text-white text-sm font-bold'>
                        {x.msg.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    {/* Message bubble */}
                    <div className='flex-1 backdrop-blur-sm bg-gray-700/50 border border-gray-600/30 rounded-2xl rounded-tl-none px-5 py-3 shadow-lg hover:shadow-amber-400/10 transition-all duration-300 group-hover:border-amber-400/30'>
                      <p className='text-gray-200 leading-relaxed break-words'>
                        {x.msg}
                      </p>
                      <div className='flex items-center justify-between mt-2 text-xs text-gray-500'>
                        <span>Message #{i + 1}</span>
                        <span className='opacity-0 group-hover:opacity-100 transition-opacity'>
                          {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input area */}
          <div className='relative border-t border-amber-400/20 bg-gray-900/50 backdrop-blur-sm p-4'>
            <div className='flex items-center space-x-3'>
              <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Type your message...'
                className='flex-1 bg-gray-800/60 border border-gray-600/40 rounded-xl px-5 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300'
              />
              <button
                onClick={()=>{ console.log(inputValue);
                ;mutate({msg:inputValue});}}
                className='group relative px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl text-gray-900 font-semibold shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 transition-all duration-300 hover:scale-105 active:scale-95'
              >
                <span className='relative z-10'>Send</span>
                <div className='absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className='text-center mt-6 text-gray-600 text-sm'>
          <p>Powered by Wandering Hart • Connecting travelers worldwide</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </div>
  );
};