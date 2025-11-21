"use client";

import React from "react";
import { motion } from "framer-motion";
import UseVariants from "@/client_hooks/useVariants";
import { useRouter } from "next/navigation";

/* -------------------------------------------
   SIMPLE TEXT APPEAR
--------------------------------------------- */
export const TextAppear = ({ children, styling }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeIn", delay: 0.2 }}
      viewport={{ amount: 0.5, once: false }}
      className={styling}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------------
   TEXT APPEAR 3 (one-by-one big heading)
--------------------------------------------- */
export const TextAppear_3 = ({ children }) => {
  const router = useRouter();
  const { parent_One_after_one, child_one_after_one } = UseVariants();

  const arrayChildren = React.Children.toArray(children);
  const first = arrayChildren[0];

  // Safe dynamic motion tag
  const Comp = motion[first?.type] || motion.div;

  return (
    <motion.div
      className="text-4xl sm:text-5xl lg:text-6xl m-auto max-w-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 tracking-wide uppercase drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25),0_0_8px_rgba(212,175,55,0.45)] font-cinzel"
      variants={parent_One_after_one}
      initial="initial"
      whileInView="animate"
      viewport={{ amount: 0.8 }}
    >
      {arrayChildren.map((x, i) => (
        <Comp key={i} variants={child_one_after_one}>
          {x.props.children}
        </Comp>
      ))}
    </motion.div>
  );
};

/* -------------------------------------------
   TEXT APPEAR 2 (large heading + button)
--------------------------------------------- */
export const TextAppear_2 = ({ children }) => {
  const router = useRouter();
  const { parent_One_after_one, child_one_after_one, childVar } =
    UseVariants();

  const arrayChildren = React.Children.toArray(children);
  const first = arrayChildren[0];

  // Safe fallback if tag type is not valid for motion
  const Comp = motion[first?.type] || motion.div;

  return (
    <motion.div
      className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl flex flex-col justify-center items-center gap-2"
      variants={parent_One_after_one}
      initial="initial"
      whileInView="animate"
      viewport={{ amount: 0.8 }}
    >
      {arrayChildren.map((x, i) => (
        <Comp key={i} className={x.props.className} variants={childVar}>
          {x.props.children}
        </Comp>
      ))}

      <motion.button
        variants={childVar}
        onClick={() => {
          router.push("/signUp");
        }}
        type="button"
        className="mt-4 z-90 cursor-pointer px-6 py-3 bg-gradient-to-r from-amber-500 to-[#d4af37] text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 text-base sm:text-lg md:text-2xl"
      >
        Register
      </motion.button>
    </motion.div>
  );
};

/* -------------------------------------------
   TEXT PARAGRAPH APPEAR (for multiple <p>)
--------------------------------------------- */
export const TextAppear_para = ({ children, styling }) => {
  const { opacityVar } = UseVariants();

  const arrayChildren = React.Children.toArray(children);

  return (
    <motion.div className="text-lg flex justify-center items-evenly flex-wrap w-[60vw]">
      {arrayChildren.map((x, i) => (
        <motion.p
          key={i}
          variants={opacityVar}
          className={styling}
          initial="initial"
          whileInView="animate"
          viewport={{ amount: 0.7, once: true }}
        >
          {x.props.children}
        </motion.p>
      ))}

      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ amount: 0.6, once: true }}
        transition={{ duration: 0.6 }}
        className="w-[30vw] h-[10px] border-b mt-12 border-b-[#d4af37]"
      />
    </motion.div>
  );
};
