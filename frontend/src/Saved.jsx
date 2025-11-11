
   {pics.map((x,i)=>{
    
    let left=Array.from({length:pics.length},(_,ind)=>{return (7*(ind+1))})
    let top=Array.from({length:pics.length},(_,ind)=>{return (20-(ind*4))})
    
    ;return( <motion.div   className='sm:absolute  z-90 shadow-[8px_0px_15px_#000000]' style={{rotateY:-20,y:y1,left:`${left[i]}%`,top:`${top[i]}%`}}>
    <img  src={x.url} className='h-[450px] w-[500px]'/>
    </motion.div>) })
    
   
    }