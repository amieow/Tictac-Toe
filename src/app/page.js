'use client'

import { useState } from "react";

function Calculator() {
  const [angka, setAngka] = useState("0");
  const [output, setOutput] = useState("");
  const [check, setCheck] = useState(false);
  const [cond, setCond] = useState(true);
  const [recent, setRecent] = useState([])
  const controlInput = (angkas) => {
    if (angka === "0" || !check) {
      if (angkas === '.') {
        setAngka(angka + angkas);
        setCheck(false);
        return;
      } else {
        setAngka(angkas);
      }
      if (!cond) {
        setOutput('');
      }
      setCheck(true);
    } else {
      if (!cond) {
        setOutput('');
        setAngka(angkas);
      } else {
        setAngka(angka + angkas);
      }
      setCheck(true);
    }
    setCond(true);
  };

  const controlOperation = (oper) => {
    if (check) {
      if (!cond) {
        setOutput(oper);
        setAngka(oper);
        setCheck(false);
      } else {
        if (Number(angka) === 0) {
          setOutput(oper);
        } else {
          setOutput(output + angka + oper);
        }
        setAngka(oper);
        setCheck(false);
      }
    } else {
      setAngka(oper);
      if (Number(output) === 0) {
        setOutput('');
      } else {
        setOutput(output.slice(0, output.length - 1) + oper);
      }
    }
  };

  const results = () => {
    if (cond && check) {
      let evalString = output + angka;
      const firstChar = evalString.charAt(0);
      const operators = ['+', '-', '*', '/'];
      if (operators.includes(firstChar)) {
        evalString = '0' + evalString; // Tambahkan angka 0 di awal string
      }
      const hasil = eval(evalString);

      const formattedResult = Number(hasil).toLocaleString('id-ID', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 4,
      });
      const resultDisplay = formattedResult.replace(/,?0+$/, ''); 

      const arrays = {
        operation: evalString,
        resultDisplay: resultDisplay,
        result: hasil,
      };
      recent.push(arrays);

      setOutput(evalString);
      setAngka(hasil || String(0));
      setCond(false);
    }
  };
  const displayRecent = recent.length > 0 ? recent.map((item,index) => {
    const tampilinResult = () => {
      setAngka(item.result)
      setOutput('')
    }
    return (
              <div onClick={tampilinResult} key={index} className="text-white flex w-full hover:bg-sky-600 transition-all flex-row-reverse h-fit gap-2 font-serif cursor-pointer">
                <div className="flex flex-col">
                  <p className=" font-extralight text-sm opacity-80 text-right text-gray-300">{item.operation}</p>
                  <p className=" text-xl text-right">{item.resultDisplay}</p>
                </div>
              </div>
            )
  }) : <p>There are no recent activity yet</p>
  return (
    <>
      <main className='m-auto flex relative max-md:h-fit max-h-[340px] max-md:flex-col '>
        <div className="calculator rounded-l-lg max-md:rounded-t-lg">
          <div className=" flex flex-col w-full">
            <div className="formulaScreen">{output}</div>
            <div id="display">{angka}</div>
          </div>
          <div className='button'>
            <button onClick={() => {
              setAngka("0");
              setOutput("");
            }} id="clear">AC</button>
            <button onClick={() => controlOperation("/")} id='divide'>/</button>
            <button onClick={() => controlOperation("*")} id='multiply'>x</button>
            <button onClick={() => controlInput(String(7))} id='seven'>7</button>
            <button onClick={() => controlInput(String(8))} id='eight'>8</button>
            <button onClick={() => controlInput(String(9))} id='nine'>9</button>
            <button onClick={() => controlOperation("-")} id='subtract'>-</button>
            <button onClick={() => controlInput(String(4))} id='four'>4</button>
            <button onClick={() => controlInput(String(5))} id='five'>5</button>
            <button onClick={() => controlInput(String(6))} id='six'>6</button>
            <button onClick={() => controlOperation("+")} id='add'>+</button>
            <button onClick={() => controlInput(String(1))} id='one'>1</button>
            <button onClick={() => controlInput(String(2))} id='two'>2</button>
            <button onClick={() => controlInput(String(3))} id='three'>3</button>
            <button onClick={() => controlInput(String(0))} id='zero'>0</button>
            <button onClick={() => controlInput(".")} id='decimal'>.</button>
            <button onClick={() => {
              results();
            }} id='equal'>=</button>
          </div>
        </div>
        <div className=" bg-[#395e9b] text-gray-300 flex flex-col min-w-[200px] overflow-y-scroll pr-2 pt-2 rounded-r-lg">
          {displayRecent}
        </div>
      </main>
    </>
  );
}

export default Calculator;