import { motion } from "framer-motion"
import {Lexend_Mega } from 'next/font/google'
const font = Lexend_Mega({subsets : ["latin"]})
export default function Menu({change} : {change : (bol : boolean) => void}) {
   const menu = ["player vs player" , "player vs computer"]
   return (
      <>
      <motion.div className="flex justify-center text-white font-bold">
         <h1 className=" text-3xl">TICTAC TOE</h1>
      </motion.div>
      <motion.div className={`text-white relative flex flex-col gap-2 ${font.className}`} layout>
         {menu.map((itm,index) => (
            <motion.button
            initial={{ x: -30,opacity : 0,}}
            animate={{x : 0,opacity : 1}}
            whileTap={{ scale : 0.9}}
            key={index}
            onClick={() => change(Boolean(index))}
            className=" bg-blue-500 text-xl tracking-widest bg-opacity-25 font-bold hover:bg-opacity-50 py-2 h-20 rounded-xl"
            >
               {itm}
            </motion.button>
         ))}
      </motion.div>
      </>
      
   )
}
