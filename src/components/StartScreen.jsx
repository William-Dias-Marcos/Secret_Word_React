import styles from './StartScreen.module.css'

const StartScreen = ({startGame})=>{
  return (
    <div className={styles.start}>
      <h1>Secret Word</h1>
      <p>Clique em jogar para iniciar</p>
      <button onClick={startGame}>Jogar</button>
    </div>
  )
}

export default StartScreen;