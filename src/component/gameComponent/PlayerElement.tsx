import { maping } from "@/app/State/reducer";
import { motion } from "framer-motion";
export function PlayerElement({
   winnings,
   isAnimating,
   isWinning,
   turn,
   playerNumber,
   dekstop,
   rotate,
   dks,
   playWithBot
}: {
   winnings: maping;
   isAnimating: boolean;
   isWinning: boolean;
   turn: maping;
   playerNumber: 1 | 2;
   dekstop?: boolean;
   rotate?: boolean;
   dks?: boolean;
   playWithBot : boolean

}) {
   const mainVariant = {
      show1: {
         display: isWinning ? (rotate === undefined && playerNumber === 2 ? "none" : "flex") : "flex",
      },
      hides1: {
         display: ["none"],
         transition: {
            delay: dekstop !== undefined && dekstop ? 0.3 : 0,
         },
      },
   };

   const playerText =
      winnings === 0 || isAnimating
         ? playWithBot && playerNumber == 2 ? "bot" : `player ${playerNumber}`
         : dks !== undefined && dks
         ? playWithBot && playerNumber == 1 ? "bot Win" : `player ${winnings} win`
         : winnings === playerNumber
         ? "You Win"
         : "You Lose";
   const isPlayerTurn = turn === playerNumber;

   const backgroundClass =
   winnings === 0 || isAnimating
         ? ""
         : dks !== undefined && dks
         ? `bg-green-400 bg-opacity-50`
         : winnings === playerNumber
         ? "bg-green-400 bg-opacity-50"
         : "bg-red-400 bg-opacity-50";

   return (
      <motion.div
         variants={mainVariant}
         animate={dekstop !== undefined && !dekstop ? "hides1" : "show1"}
         className={`flex ${rotate ? "rotate-180" : ""} w-full transition-all h-8 text-xl ${
            isWinning && `duration-700 absolute text-4xl py-4 backdrop-blur-md w-full h-fit ${
               playerNumber === 1 ? "translate-y-48" : rotate === undefined ? "hidden" : "-translate-y-64"
            } z-10 `
         } ${backgroundClass} ${isPlayerTurn ? "text-blue-400" : ""} flex-col relative`}
      >
         <p>{playerText}</p>
         <motion.span
            variants={{
               show: {
                  width: ["0%", "100%"],
                  transition: {
                     duration: 0.5,
                     delay: 0.1,
                  },
               },
               hide: {
                  width: "0%",
                  transition: {
                     duration: 0.5,
                  },
               },
            }}
            animate={isPlayerTurn && !Boolean(winnings) ? "show" : "hide"}
            className="h-1 bg-emerald-300 mx-auto"
         ></motion.span>
      </motion.div>
   );
}