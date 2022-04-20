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

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState(0);

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
  const verifyLetter = (letter)=>{
    const normalizeLetter = letter.toLowerCase();

    // check if letter has already benn utlizerd
    if(
      guessedLetters.includes(normalizeLetter) ||
      wrongLetters.includes(normalizeLetter)
    ){
      return;
    }

    // push guessed letter or remove a guess
    if(letters.includes(normalizeLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizeLetter
      ])
    } else{
      setWrongLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizeLetter
    ]);
    setGuesses((actualGuesses) => actualGuesses - 1)
    };
  };

  const clearLettersStates = ()=>{
    setGameStage([]);
    setWrongLetters([]);
  }

  useEffect(()=>{
    if (guesses <=0){
      //restarts the states
      clearLettersStates()

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // restarts the game
  const retry = ()=>{
    setScore(0);
    setGuesses(5);
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && 
      <Game 
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        />}
      {gameStage === "end" && <Gameover retry={retry}/>}
    </div>
  )
}

export default App
