import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const MainRoutes = () => {

const Home=lazy(()=>{return import("./App")});
const Test=lazy(()=>{return import("./Trial_1")});

    return (
        <Suspense fallback="LOADING">
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/test' element={<Test/>}/>
                
            </Routes>
            


        </div>
        </Suspense>
    );
}

export default MainRoutes;
