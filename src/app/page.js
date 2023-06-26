'use client'

import { useState } from "react";

function Calculator() {
  const [angka,setAngka] = useState("0");
  const [output, setOutput] = useState("");
  const [check,setCheck] = useState(false);
  const [cond,setCond] = useState(true)
  const controlInput = (angkas) => {
    if (angka === "0" || check == false) {
      setAngka(angkas)
    }else {
      if(!cond){
        setOutput('')
        setAngka(angkas)
      }else {
        setAngka(angka + angkas)
      }
    }
    setCheck(true)
    setCond(true)
  }
  const controlOperation = (oper) => {
    if(check){
      if(!cond){
        setOutput(oper);
        setAngka(oper)
        setCheck(false)
      }else{
        setOutput(output + angka + oper);
        setAngka(oper)
        setCheck(false)
      }
      
    }else {
      setAngka(oper)
      setOutput(output.slice(0,output.length - 1) + oper)
    }
  }
  const results = () => {
    if(cond){
      setOutput(output + angka)
      setAngka(eval(output + angka) || String(0))
      setCond(false)
    }
  }
  return (
    <>
      <main className='full'>
        <div className="calculator">
          <div className="formulaScreen">{output}</div>
          <div id="display">{angka}</div>
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
      </main>
    </>
  );
}

export default Calculator;