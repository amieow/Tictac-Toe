import { useState } from "react";
import { motion } from "framer-motion";
import { STATE, maping } from "@/app/State/reducer";
import { BadgeAlert, X } from "lucide-react";
import { variantsInfoPlayer } from "../game";
export const InfoPlayer = ({ player = 0,state,dekstop,isAnimating,playWithBot }: { player?: maping,state : STATE,dekstop : boolean,isAnimating : boolean,playWithBot : boolean }) => {
   const {winnings,turn} = state
   const [show, setShow] = useState(true);
   const animations =( !Boolean(winnings) || isAnimating) && show && (player !== 2 || !dekstop) ? "show" : "hide";
   const info = ["player 1 = X" , `${playWithBot ? "bot" : "player 2"} = O`]
   return (
      <motion.div
         layout
         variants={variantsInfoPlayer}
         initial="hide" // Tetapkan initial ke "show"
         animate={show && (!playWithBot || player == 1) ? animations : "hide"} // Gunakan animations hanya ketika show = true
         onAnimationComplete={() => {
         if (!show) {
            setShow(false);
         }
         }}
         className={`ml-auto backdrop-blur-md`}
      >
         <ul className={`${player === 1 ? 'ml-auto' : 'mr-auto rotate-180'} text-lg sm:text-2xl text-white rounded-t-lg w-36 sm:w-40 bg-gray-800 bg-opacity-70 p-1 divide-y-2 divide-gray-500`}>
         <li className='flex justify-between text-red-500'>
            <p className='flex gap-1'><BadgeAlert className='my-auto' />INFO</p>
            <button onClick={() => setShow((prv) => !prv)} className=' px-2'><X size={24} /></button>
         </li>
         {info.map((item, index) => {
            const bgLi = (dekstop ? playWithBot ? player == index + 1 : turn == index + 1 : player == index + 1)
               ? `bg-sky-400 ${
                     playWithBot && turn == 2 ? "bg-opacity-30" : "bg-opacity-80"
                  }`
               : playWithBot && turn == 2 && " bg-violet-800";
            return (
               <li className={`px-2 p-1 ${playWithBot ? "text-right" : ""} ${bgLi}`} key={index}>
                     {item}
               </li>
            );
         })
         }
         </ul>
      </motion.div>
   );
};