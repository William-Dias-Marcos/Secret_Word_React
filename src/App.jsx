// css
import './App.css'

// React
import { useCallcack, useEffect, useState } from 'react';

// data
import {wordsList} from './data/words';

// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import Gameover from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList)

  const [pickedWord, setPichedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([])

   //pick word ans pick category
  const pickWordAndPickCategory= ()=>{

    // pick a random category
    const categories = Object.keys(words);
    const category = 
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
    // pick a random word
    const word = 
    words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category}
    
  }

  // starts the secret word game
  const startGame = ()=>{
    const {word, category} = pickWordAndPickCategory();

    // create an array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l)=> l.toLowerCase())

    // fill states
    setPichedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name);
  }

  // process the letter input
  const verifyLetter = ()=>{
    setGameStage(stages[2].name)
  }

  // restarts the game
  const retry = ()=>{
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter}/>}
      {gameStage === "end" && <Gameover retry={retry}/>}
    </div>
  )
}

export default App
