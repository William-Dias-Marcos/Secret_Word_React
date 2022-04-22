import styles from './GameOver.module.css';

const Gameover  = ({retry, score})=>{
  return(
    <div>
      <h1 className={styles.title}>Fim de Jogo</h1>
      <h3>
        Você atingiu: <span>{score} pontos</span>
      </h3>
      <button onClick={retry}>Reiniciar o Jogo</button>
    </div>
  )
}

export default Gameover;