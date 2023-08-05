'use client'
import Menu from "@/component/Menu";
import Game from "@/component/game";
import { memo, useReducer, useState } from "react";
import { INITIAL_STATE, REDUCER } from "./State/reducer";
import { motion } from "framer-motion";

function MainPage() {
   const [state, dispatch] = useReducer(REDUCER, INITIAL_STATE);
   const [isMenu,setMenu] = useState(true)
   const [playWithBot,setPlayWith] = useState(false)
   const changePlayed =(bol : boolean) => {
      setPlayWith(bol)
      setMenu(false)
   }
   if(isMenu){
      return (
         <motion.div key={Number(playWithBot)} initial={{opacity : 0}} animate={{opacity : 1}} className={`${isMenu ? "gap-5 w-full rounded-lg flex-col max-w-screen-md flex max-md:mx-3 m-auto bg-opacity-70 bg-slate-900 p-1" : "min-h-screen flex flex-col w-screen"}`}>
            <Menu change={changePlayed} />
         </motion.div>
      )
   }
   return (
   <Game key={`${playWithBot}-1`} setMenu={setMenu} dispatch={dispatch} state={state} playWithBot={playWithBot}/>
)
   
}

export default memo(MainPage)