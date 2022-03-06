import {useEffect, useState} from "react";


function App() {

  const [number,setNumber]=useState(Math.floor(Math.random() * 100) +1 );
  const [tries,setTries]=useState(7);
  const [counter,setCounter]=useState(60);
  const [value,setValue] = useState("");
  const [pastGuess,setPastGuess] = useState([])
  let deneme=[];
   let resetGame = () => {
     setTries(7);
     setValue("");
     setCounter(60)
     setNumber(Math.floor(Math.random() * 100) +1 )
  }

  useEffect(()=> {
    if(tries <= 0){
      setPastGuess(["Time is Out"])
      alert("Game Over");
      resetGame();
    }
  },[tries])
  useEffect(()=> {
    let timer=setInterval(()=> {
      setCounter(counter-1)
      if(counter <= 0){
        resetGame();
      }
    },1000);

    return () => {
      clearInterval(timer);
    }
  },[counter])

  function handleInput(text) {
    setValue(text.target.value);
  }

  function handleClick() {
    if(value.toString()===number.toString()){
      alert("Success")
      resetGame();
    }
    else {
      setTries(tries-1)
      if(value < number){
       pastGuess.push([value,"larger"])
      }
      else {
        pastGuess.push([value,"smaller"])
      }
      console.log(pastGuess)
    }
  }


  return (
    <div className="container" >

      <header className="App-header">
        <div className="card-header">
          <a>Guess Number</a>
        </div>
        <div class="d-flex flex-column" >
          <div  class="d-flex flex-row d-flex align-items-center mb-2">
            <progress id="tries" value={tries.toString()} max="7"> {tries.toString()} </progress>
            <a className="text-dark" > Tries: {tries} </a>
          </div>
          <div class="d-flex flex-row d-flex align-items-center mb-2" >
            <progress  id="counter" value={counter.toString()} max="60"></progress>
            <a className="text-dark"> {counter}  </a>
          </div>

        </div>
        <div  class="d-flex flex-column d-flex align-items-start">
          <input className="input-group" value={value} onChange={text => handleInput(text)}/>
          <button className="btn btn-success" onClick={handleClick} >Play</button>



        </div>
        <div>
          <table className="table table-hover table-striped table-bordered">
            <thead>
            <tr>

              <th>Guess</th>
              <th>Message</th>
            </tr>
            </thead>
            <tbody>
            {
              pastGuess.map((move, index) =>
                  <tr key={move.toString() + index.toString()}>
                    <td>{move[0]}</td>
                    <td>{move[1]}</td>
                  </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
