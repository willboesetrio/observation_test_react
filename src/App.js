import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {




  const [targetNumber, setTargetNumber] = useState(1);
  const [oddButtons, setOddButtons] = useState([]);
  const [evenButtons, setEvenButtons] = useState([]);
  const [oddClicks, setOddClicks] = useState(0);
  const [evenClicks, setEvenClicks] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const timerId = useRef();

  const startTimer = () => {
    setInterval(() => {
        setSeconds(seconds => seconds + 1)
    }, 1000)
}

  const stopTimer = () => {
    clearInterval(setSeconds(0))
  }


  // let timer;
  // useEffect(() => {

  //   timer = setInterval(() =>{
  //     if(oddButtons.length > 0){
  //     setSeconds(seconds+1)
  //     }
  //   },1000)
  //   if (targetNumber > 25) {
  //     return clearInterval(timer)
  //   }
  // },[oddButtons])


  const odds = [];
  for(let i = 1; i <= 25; i+=2) {
    odds.push(i);
  }
  const evens = [];
  for(let i = 2; i <= 24; i+=2) {
    evens.push(i);
  }

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
 return array;
}


  const clickFunction = (event) => {
    if (event.target.value == targetNumber) {
      setTargetNumber(targetNumber + 1)
      if (event.target.value % 2 === 0) {
        setEvenClicks(evenClicks + 1)
      } if (event.target.value % 2 !== 0) {
        setOddClicks(oddClicks + 1)
      }
    } else {
      if (event.target.value % 2 === 0) {
        setEvenButtons(shuffle(evens))
        setEvenClicks(evenClicks + 1)
      } if (event.target.value % 2 !== 0) {
        setOddButtons(shuffle(odds))
        setOddClicks(oddClicks + 1)
      }
    } 
  }

  //when you attach the on click function here it doesnt work
  const startGame = () => {
    setSeconds(0);
    startTimer();

    setOddButtons(shuffle(odds))
    setEvenButtons(shuffle(evens))
    setTargetNumber(1);

  }


  const winMessage = () => {
    //stopTimer();
    if(targetNumber > 25) {
      return <div>
        <p>WIN</p>
        <p>your score: 25 / {oddClicks + evenClicks} = {25/(oddClicks + evenClicks)}</p>
         <p>TIME: {seconds} seconds</p> 
      </div>
    }
  }



  //when you attach the onclick function here it does work
  return (
    <div className="App">
      <div>
        <button onClick={startGame}>START GAME</button>
      </div>
      <div>
        <p>ODD CLICKS: {oddClicks} EVEN CLICKS: {evenClicks} SECONDS: {seconds}</p>
      </div>
      <div className='btn-grid'>
      {oddButtons.map((b) => {
      return <button key={b} value={b} onClick={clickFunction} disabled={b < targetNumber}>{b}</button>
    })}
    </div>
    <hr/>
    <div className='btn-grid'>
      {evenButtons.map((b) => {
      return <button key={b} value={b} onClick={clickFunction} disabled={b < targetNumber}>{b}</button>
    })}
    </div>
    <div>{targetNumber}</div>
    <div>{winMessage()}</div>
    <button onClick={startTimer}>TEST</button>
    </div>
  );
}

export default App;
