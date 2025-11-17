import React from 'react';

const UseVariants = () => {


    let parentVar={initial:{opacity:1},animate:{opacity:1,transition:{duration:1,staggerChildren:.07,}}};

const childVar = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",delayChildren:1
          // small delay before starting children
    }
  }
};

const grandChildVar = {
  initial: { opacity: 0,y:5 }, // tiny upward fade-in
  animate: {
    opacity: 1,y:0,
    
    transition: {
      duration: 1,
     
    }
  }
};

const parent_One_after_one={initial:{opacity:1},animate:{opacity:1,transition:{duration:0.1,staggerChildren:.4}}};

const child_one_after_one={initial:{opacity:0},animate:{opacity:1,transition:{duration:0.08,staggerChildren:.5,delayChildren:.3}}}

let opacityVar={initial:{opacity:0,y:10},animate:{opacity:1,y:0 ,transition:{duration:.3,ease:"easeOut",delay:0.4}}};

    return  {parentVar,childVar,grandChildVar,opacityVar,parent_One_after_one,child_one_after_one}
}

export default UseVariants;
