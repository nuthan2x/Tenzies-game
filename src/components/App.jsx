/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import '../css/App.css'
import Die from './die'

function App() {

  const [diearray, setdiearray] = useState(setdie());
  const [Allsame, setAllsame] = useState(false);
  var [rolls, setrolls] = useState(0);
  var [totalrolls, settotalrolls] = useState(0);

  useEffect(() => {
    
    let x = diearray.every(die => die.isSame)
  
    let y = diearray.every(die => die.value === diearray[0].value)
    if(x && y) { setAllsame(true);   settotalrolls(rolls); setrolls(0); } 
    
  }, [diearray]);

  function setdie()  {
    const die =[]
    for (let i = 0; i < 10; i++) {
      die.push({id : i  , isSame: false,value : Math.ceil(Math.random() * 6)})
    }
    return die
  }

  const diceelements = diearray.map(die => <Die key={die.id} value={die.value} onclick={() => dieclick(die.id,die.value)} isSamee={die.isSame} 
  />)
  
 
  function handleclick(event) {
    Allsame ? setrolls(rolls) : setrolls(rolls + 1)
    const x = setdie()
    Allsame &&  setAllsame(false)
    Allsame ? setdiearray(x) :
    setdiearray(() => {
      return diearray.map((die,i) => {
        const y = !die.isSame ? x[i].value : die.value
        return {...die, value : y}
      })
    }); 
  }  

  
  
  function dieclick(d,v){
    setdiearray(prev => {
     return  prev.map(die => {
       let z = (die.id === d /* && die.value === v */)? !die.isSame : die.isSame
       return {...die, isSame : z}
      })
    }
    )
  }


  

  return (
    <div className='Box' >
      <div className="mainbox">
       <h1 className="title">Tenzies</h1>
       <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">     
        {diceelements}
        </div>
        <h5>{Allsame ? `total rolls: ${totalrolls}` : `total rolls: ${rolls}` }</h5>
        <button onClick={handleclick} className={ Allsame ? "btn1" : "btn"}>{ Allsame ? "New game" : "roll"}</button>
      </div>
      {Allsame && <Confetti />}
      
    </div>
  )
}

export default App
