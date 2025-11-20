import React from 'react';
import Gallery from './gallery';
import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';


// Sample data with Unsplash images
const samplePlaces = [
  {
    name: "Tokyo Skyline",
    description: "Experience the vibrant energy of Tokyo's modern cityscape, where neon lights illuminate towering skyscrapers and traditional culture meets cutting-edge innovation in perfect harmony.",
    places_image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format",
    id: 1
  },
  {
    name: "Swiss Alps",
    description: "Breathtaking mountain peaks covered in pristine snow, offering spectacular views and world-class skiing experiences in one of Europe's most stunning natural landscapes.",
    places_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
    id: 2
  },
  {
    name: "Tropical Paradise",
    description: "Crystal clear turquoise waters lap against white sandy beaches, surrounded by swaying palm trees and vibrant coral reefs teeming with marine life.",
    places_image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop&auto=format",
    id: 3
  },
  {
    name: "Ancient Rome",
    description: "Walk through millennia of history among magnificent ruins, grand architecture, and timeless art that tells the story of one of civilization's greatest empires.",
    places_image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop&auto=format",
    id: 4
  },{
    name: "Swiss Alps",
    description: "Breathtaking mountain peaks covered in pristine snow, offering spectacular views and world-class skiing experiences in one of Europe's most stunning natural landscapes.",
    places_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
    id: 2
  },
  {
    name: "Tropical Paradise",
    description: "Crystal clear turquoise waters lap against white sandy beaches, surrounded by swaying palm trees and vibrant coral reefs teeming with marine life.",
    places_image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop&auto=format",
    id: 3
  },
  {
    name: "Ancient Rome",
    description: "Walk through millennia of history among magnificent ruins, grand architecture, and timeless art that tells the story of one of civilization's greatest empires.",
    places_image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop&auto=format",
    id: 4
  },{
    name: "Swiss Alps",
    description: "Breathtaking mountain peaks covered in pristine snow, offering spectacular views and world-class skiing experiences in one of Europe's most stunning natural landscapes.",
    places_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
    id: 2
  },
  {
    name: "Tropical Paradise",
    description: "Crystal clear turquoise waters lap against white sandy beaches, surrounded by swaying palm trees and vibrant coral reefs teeming with marine life.",
    places_image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop&auto=format",
    id: 3
  }
];
 
 
 const Page =async () => {

  try {

let get=await get_fetch("team")
console.log(get);

    return (
    <div className='bg-gray-900'>
      <Gallery x={get}/>
    </div>
  );
  } catch (error) {
    console.log(error.message);
   return  <div role="alert" className="flex items-center justify-center h-screen bg-gray-900 p-4 overflow-auto">
                <div className="text-center p-8 bg-red-800/60 backdrop-blur-sm rounded-xl border border-red-700 shadow-lg max-w-lg mx-auto">
                    <p className="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong.</p>
                    <p className="text-gray-200 mb-4">We couldn't load the information.</p>
                    <pre className="text-sm text-red-200 overflow-auto max-h-40 bg-red-900/40 p-3 rounded">{error.message}</pre>
                </div>
            </div>
  }

  
 }
 
 export default Page;
 