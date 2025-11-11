import React, { lazy, Suspense, useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import AutoLogin from './AutoLogin';
import Home from './Home';
import Lenis from 'lenis';
import Protected from './Protected';
import WanderingHartNavbar from './utils/Navbar';
const MainRoutes = () => {


  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

    let Sign = lazy(() => { return import("./Sign") });
let City=lazy(()=>{return import("./City")});
let Order=lazy(()=>{return import("./order/Order_panel")})

    let memo = useMemo(() => {
        return <div>

            {/* <AutoLogin /> */}
            <Suspense fallback={<p>Loading</p>}>

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/sign' element={<Sign />} />
                    <Route path='/booking/:city' element={<Protected><Order/></Protected>} />
              <Route path='/City' element={<City/>} />
                </Routes>

            </Suspense>
        </div>
    }, [])

    return (
        <div className='bg-gray-900 relative scrollbar-hide  max-w-screen min-h-screen'>
            {/* <div className='absolute  top-0 z-0 left-0 h-full w-full backdrop-blur-'></div> */}
            <WanderingHartNavbar/>
            <div data-lenis-speed="0.4"  className='relative w-[98vw] z-10 scrollbar-hide '>   {memo}</div>

        </div>
    );
}

export default MainRoutes;
