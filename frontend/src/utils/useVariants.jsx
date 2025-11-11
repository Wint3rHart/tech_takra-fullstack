import React from 'react';

const UseVariants = () => {


    let parentVar={initial:{opacity:1},animate:{opacity:1,transition:{duration:1,staggerChildren:.07,delayChildren:.5}}};

const childVar = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      staggerChildren: 0.05, // smaller stagger for smoother flow
      delayChildren: 0.4     // small delay before starting children
    }
  }
};

const grandChildVar = {
  initial: { opacity: 0, y: 10 }, // tiny upward fade-in
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut"
    }
  }
};
let opacityVar={initial:{opacity:0,y:10},animate:{opacity:1,y:0 ,transition:{duration:.5,ease:"easeInOut"}}};

    return  {parentVar,childVar,grandChildVar,opacityVar}
}

export default UseVariants;
