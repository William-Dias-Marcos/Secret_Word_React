import styles from './GameOver.module.css';

const Gameover  = ({retry})=>{
  return(
    <div>
      <h1>Game Over</h1>
      <button onClick={retry}>Reiniciar o Jogo</button>
    </div>
  )
}

export default Gameover;