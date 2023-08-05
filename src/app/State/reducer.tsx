export type STATE = {
   turn: maping;
   map: maping[][];
   sumTurn : number
   winnings : 0|1|2
   story : StoryPlayers[]
};
type StoryPlayers = {
   turn : maping
   index : INDEX
}
export type maping = (1 | 2 | 0);
export const INITIAL_STATE: STATE = {
   turn: 1,
   winnings : 0,
   sumTurn : 0,
   map: Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0 as 1 | 2 | 0)),
   story : []
};

export const ACTIONS = {
   CHANGE_ARRAY : "Change Array",
   RESET_ARRAY : "Reset Array",
   CHANGE_TURN : "Change Turn",
}

type INDEX = {indexX : number, indexY : number}

export type ACTIONType = {
   type : typeof ACTIONS[keyof typeof ACTIONS]
   payload? : {
      index : INDEX
   }
}




export const REDUCER = (state: STATE, action: ACTIONType): STATE => {
   switch (action.type) {
      case ACTIONS.CHANGE_ARRAY: {
         const { indexX,indexY } = action.payload?.index || {};
         const newMap = [...state.map];
         if(indexX === undefined || indexY === undefined){
            return state
         }
         if(state.turn == 0){
            return state
         }
         let winnings: maping = 0;
         newMap[indexY][indexX] = state.turn;
         const story = [...state.story]
         story.push({
            turn : state.turn,
            index : {indexX,indexY}
         })
         const checkWin = (arr: maping[]): boolean => arr[0] == 0 ? false : arr.every((itm) => itm === arr[0]);
         if (state.sumTurn + 1 >= 4) {
            for (let y = 0; y < 3; y++) {
               if (checkWin(newMap[y])) {
                  winnings = newMap[y][0];
                  break;
               }
            }

            if (winnings === 0) {
               for (let x = 0; x < 3; x++) {
                  let column : maping[] = []
                  for (let y = 0; y < 3; y++) {
                     column.push(newMap[y][x])
                  }
                  if (checkWin(column)) {
                     winnings = column[0];
                     break;
                  }
               }

               if (winnings === 0) {
                  const diag1 = [newMap[0][0], newMap[1][1], newMap[2][2]];
                  const diag2 = [newMap[0][2], newMap[1][1], newMap[2][0]];

                  if (checkWin(diag1) || checkWin(diag2)) {
                  winnings = newMap[1][1];
                  }
               }
            }
         }
         return {
            ...state,
            map: newMap,
            sumTurn: state.sumTurn + 1,
            turn : 0,
            winnings,
            story
         };
      }
      case ACTIONS.CHANGE_TURN : {
         const lastStoryIndex = state.story.length - 1;
      const nexTurn = lastStoryIndex >= 0 ? state.story[lastStoryIndex] : null;
         return {
            ...state,
            turn : state.sumTurn + 1 == 9 || Boolean(state.winnings) ? 0 : nexTurn?.turn == 1 ? 2 : 1,
         }
      }
      case ACTIONS.RESET_ARRAY : {
         return {
            ...state,
            map : Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0 as 1 | 2 | 0)),
            turn : 1,
            sumTurn : 0,
            winnings : 0,
            story : []
         }
      }
      default:{
         return state;
      }
   }
   };
