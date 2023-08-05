
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ACTIONS, ACTIONType, STATE, maping  } from '@/app/State/reducer';
import { Undo2,BadgeAlert, Smartphone,Monitor } from 'lucide-react';
import { InfoPlayer } from './gameComponent/InfoPlayer';
import { PlayerElement } from './gameComponent/PlayerElement';
import { RandomIndex } from './Utils';
export const variantsInfoPlayer = {
      show: {
         opacity : 1,
         y : 0,
         transition : {
            duration : 2,
            delay : 0.5
         }
      },
      hide: {
         opacity : 0,
         y : -50,
         transition : {
            duration : 2,
            delay : 0.5
         }
      },
   };
export const variantOutline = {
      show : {
         width : ["0%","100%"],
         opacity : ["10%","100%"],
         transition : {
            duration : 0.6,
            delay : 0.2
         }
      
      },
      hide : {
         width : 0,
         opacity : "20%"
      }
   }
export default function Game({setMenu,state,dispatch,playWithBot } : {setMenu : (bol : boolean) => void,state : STATE,dispatch : (stat : ACTIONType) => void,playWithBot : boolean}) {
   const {map,turn,winnings,sumTurn} = state
   const [dekstop,setDekstop] = useState(false)
   const [isAnimating, setIsAnimating] = useState(false);
   const back = () => {
      dispatch({type : ACTIONS.RESET_ARRAY})
      setMenu(true)
   }
   useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (turn === 2 && playWithBot) {
         const delayDuration = 2000;
         let indexX:number,indexY : number,i : number = 0
         let search = true
         while (search) {
            indexX = RandomIndex(3)
            indexY = RandomIndex(3)
            if(map[indexY][indexX] == 0 || sumTurn == 9){
               search = false
            }
            i++
            if(i >= 20){
               search = false
            }
         }
         if(sumTurn == 9){
            console.log("loh kok 9 lol")
            return;
         }
         timeout = setTimeout(() => {
            if (!isAnimating && map[indexY][indexX] == 0 && !Boolean(winnings) && Boolean(turn) && playWithBot) {
               setIsAnimating(true);
               dispatch({
                  type: ACTIONS.CHANGE_ARRAY,
                  payload: { index: { indexX, indexY } },
               });
               setTimeout(() => {
                  dispatch({ type: ACTIONS.CHANGE_TURN });
                  setIsAnimating(false);
               }, 2400);
            }
         }, delayDuration);
      }

      return () => {
         clearTimeout(timeout);
      };
   }, [turn, dispatch]);
   
   const handleButtonClick = (indexX : number,indexY : number,item : maping) => {
      if (!isAnimating && item === 0 && !Boolean(winnings) && Boolean(turn) && (playWithBot ? turn == 1 : true ) ) {
         setIsAnimating(true);
         dispatch({
            type: ACTIONS.CHANGE_ARRAY,
            payload: { index: { indexX, indexY } },
         });
         setTimeout(() => {
            dispatch({ type: ACTIONS.CHANGE_TURN });
            setIsAnimating(false);
         }, 2400);
      }
   };
   const isWinning = winnings != 0 && !isAnimating
   return(
      <div className='m-auto w-full px-3 md:max-w-5xl '>
         <div className='pb-1'>
            <InfoPlayer playWithBot={playWithBot} isAnimating={isAnimating} state={state} dekstop={dekstop} key={2} player={2}/>
         </div>
         <div className={`flex p-1  duration-500 transition-all min-h-[404px]${dekstop ? "" : ""} rounded-xl px-3 bg-gray-800 bg-opacity-50`}>
            <div className='flex flex-col w-full'>
               <div>
                  <button onClick={back} className=" bg-green-500 w-10 pl-1 h-7 rounded-br-[100%] ">
                     <Undo2 rotate={180} className=" font-bold" size={16}/>
                  </button>
               </div>
               <div className='text-white text-center relative'>
                  <div className='flex'>
                     <PlayerElement playWithBot={playWithBot} dks={dekstop || playWithBot} winnings={winnings} isAnimating={isAnimating} isWinning={isWinning} turn={turn} playerNumber={1}  />
                     <PlayerElement playWithBot={playWithBot} dekstop={dekstop || playWithBot} winnings={winnings} isAnimating={isAnimating} isWinning={isWinning} turn={turn} playerNumber={2}  />
                  </div>
                  <div className='gap-6 flex flex-col py-2'>
                  {map.map((map2, indexY) => (
                     <div key={indexY} className="flex justify-between sm:justify-evenly">
                        {map2.map((item2, indexX) => {
                           
                           const XVarian = {
                              show: {
                                 width: ["0%", "100%", "100%"],
                                 rotate: [0, 0, 45],
                                 y: [0, 0, 35],
                                 transition: {
                                    duration: 2,
                                    delay: 0.3
                                 }
                              },
                           }; 
                           const XVarian2 = {
                              show: {
                                 width: ["0%", "100%", "100%"],
                                 rotate: [0, 0, -45],
                                 y: [0, 0, -35],
                                 transition: {
                                    duration: 2,
                                    delay: 0.3
                                 }
                              },
                           };
                           return (
                              <motion.button
                                 key={indexX}
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1, transition: { duration: 0.7, delay: ((indexX + indexY) / 4) } }}
                                 onClick={() => handleButtonClick(indexX,indexY,item2)}
                                 className={`cursor-pointer disabled:cursor-default ${
                                    item2 === 2 ? ' justify-center' : ' justify-between'
                                 }  relative w-24 flex flex-col bg-gray-800 border border-gray-400 bg-opacity-40 rounded-lg h-20 order-2`}
                              >
                                 {item2 != 0 && item2 == 1 ? (
                                    <>
                                    <motion.span 
                                    onAnimationComplete={() => {
                                    if (Number(item2) === 0 && !Boolean(winnings)) {
                                       dispatch({ type: ACTIONS.CHANGE_TURN });
                                    }
                                 }} 
                                 variants={XVarian} animate={"show"} className='h-2 bg-green-400 rounded-xl' ></motion.span>
                                    <motion.span variants={XVarian2} animate={"show"} className='h-2 bg-green-400 rounded-xl'></motion.span>
                                    </>
                                 ) : (
                                    item2 == 2 && (
                                       <motion.div  animate={{
                                          width : [0,72],
                                          height : [0,72],
                                          borderRadius : ["100%"],
                                          borderWidth : [4,32,8],
                                          
                                          transition : {
                                             duration : 2,
                                          }
                                       }} className=" bg-transparent border-sky-400 m-auto"></motion.div>
                                    )
                                 )}
                              </motion.button>
                           );
                        })}
                     </div>
                     ))}
                  </div>
                  <PlayerElement playWithBot={playWithBot} rotate dekstop={!(dekstop || playWithBot)} winnings={winnings} isAnimating={isAnimating} isWinning={isWinning} turn={turn} playerNumber={2}  />
               </div>
            </div>
         </div>
         <div className='flex bg-gray-400'>
         </div>
         <div className='flex pt-1'>
            <div className='hidden flex-col gap-2 md:flex md:flex-shrink-0'>
               <p className='h-fit bg-white p-1 px-3 rounded-lg hidden gap-2 flex-shrink-0 md:flex'><BadgeAlert/> DETECTED LARGE DEVICE, WE RECOMEND USING PHONE</p>
               <motion.button
                  onClick={() => setDekstop((prev) => !prev)}
                  className={`flex relative overflow-hidden h-10 text-white bg-gray-800 py-2 border-2 ${dekstop ? "border-blue-400" : "border-red-400 hover:bg-blue-400"} w-fit transition-all duration-300  px-3 rounded-lg`}
                  >
                  <motion.div
                  className='flex flex-col gap-2'
                     layout
                     initial={{ y: "0" }} // Mulai dari posisi y: 0 (tengah)
                     animate={{ y: dekstop ? "-170%" : "0%"}} // Akhiri di posisi y: 100% (bawah) atau -100% (atas)
                  >
                     <p className='flex'>
                     <Smartphone className='' /> Smartphone
                     </p>
                     <p className='flex'>
                        <Monitor />Dekstop
                     </p>
                  </motion.div>
               
               </motion.button>
            </div>
            <div className='flex w-full justify-center gap-4 text-white'>
               <button onClick={() => dispatch({type : ACTIONS.RESET_ARRAY})} className='p-1 px-2 text-lg h-fit border-red-400 border-2 rounded-lg transition-all hover:border-red-600 hover:bg-red-400 duration-300'>Reset</button>
               {isWinning && <button onClick={() => dispatch({type : ACTIONS.RESET_ARRAY})} className='p-1 px-2 text-lg border-2 border-blue-400 rounded-lg h-fit transition-all hover:border-blue-600 hover:bg-blue-400 duration-300'>Next</button>}
            </div>
            <InfoPlayer playWithBot={playWithBot} isAnimating={isAnimating} state={state} dekstop={dekstop} key={1} player={1}/>
         </div>
      </div>
   )
}
