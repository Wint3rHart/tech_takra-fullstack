import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';
import React from 'react';
import Ref_wrapper from '../general_comps/text_stagger';

const CityHeader = async ({ city }) => {
    // A function to fetch the data and handle errors
    const fetchCityData = async () => {
        try {
            const get = await get_fetch(`city_name`, city);
            if (get.error) {
                throw new Error(get.error);
            }
            return { city: get.data[0], error: null };
        } catch (error) {
            // console.error("Error fetching city data:", error.message);
            return { city: null, error: error.message };
        }
    };

    const data = await fetchCityData();

    if (data.error) {
        return (
            <div role="alert" className="flex items-center justify-center h-screen bg-gray-900 p-4 overflow-auto">
                <div className="text-center p-8 bg-red-800/60 backdrop-blur-sm rounded-xl border border-red-700 shadow-lg max-w-lg mx-auto">
                    <p className="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong.</p>
                    <p className="text-gray-200 mb-4">We couldn't load the city information.</p>
                    <pre className="text-sm text-red-200 overflow-auto max-h-40 bg-red-900/40 p-3 rounded">{data.error}</pre>
                </div>
            </div>
        );
    }

    const backgroundImage = data?.city?.city_image
        ? `url("/${data.city.city_image}")`
        : 'url("/default-city-bg.jpg")'; // Add a default placeholder image

    return (
        <div
            className="relative h-[100vh] bg-gray-900 w-full flex-shrink-0 flex items-center justify-center overflow-hidden"
            
        >
            <div 
            style={{WebkitMaskImage:'url("/—Pngtree—ink style ps photo mask_4364082.png")',WebkitMaskSize:"contain",WebkitMaskPosition:"center",WebkitMaskRepeat:"no-repeat",maskImage:'url("/—Pngtree—ink style ps photo mask_4364082.png")',maskSize:"cover",maskPosition:"center",maskRepeat:"no-repeat"}}
            className='  absolute top-10 left-[40vw]  h-[500px] w-[50vw] drop-shadow-[3px_10px_10px_rgba(0,0,0,1)]'
            >
            <div className='absolute top-10 left-[5vw] h-[500px] w-[50vw] '
             style={{
                backgroundImage: backgroundImage,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top",
            }}
            />
            </div>

            {/* The overlay gradient to enhance text readability */}
            <div style={{
                backgroundImage: `url('/—Pngtree—grunge overlay texture_9164503.png')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top",
            }} className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* The main content, centered on the screen */}
            <div className="relative text-white z-10 text-center ">
                <Ref_wrapper>
                    <p>Welcome to</p>
                    <p>{data?.city?.city_name}</p>
                    <p>A Journey Through Culture</p>
                </Ref_wrapper>
            </div>
        </div>
    );
};

export default CityHeader;