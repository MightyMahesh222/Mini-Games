import {Line} from 'rc-progress'

const emojisArray = [
  {
    id: 'neutral face',
    img: 'https://ik.imagekit.io/sdce03tuc/05%20Pokerface.svg',
  },
  {
    id: 'grimacing face',
    img: 'https://ik.imagekit.io/sdce03tuc/07%20Grimmace.svg',
  },
  {
    id: 'slightly smiling face',
    img: 'https://ik.imagekit.io/sdce03tuc/_@2x.svg',
  },
  {
    id: 'grinning face with big eyes',
    img: 'https://ik.imagekit.io/sdce03tuc/03%20Optimistic.svg',
  },
  {
    id: 'grinning face with smiling eyes',
    img: 'https://ik.imagekit.io/sdce03tuc/halfteeth.svg',
  },
  {
    id: 'beaming face with smiling eyes',
    img: 'https://ik.imagekit.io/sdce03tuc/05%20Laugh.svg',
  },
  {id: 'grinning face', img: 'https://ik.imagekit.io/sdce03tuc/02%20Happy.svg'},
  {
    id: 'smiling face with sunglasses',
    img: 'https://ik.imagekit.io/sdce03tuc/02%20Happy.svg',
  },
]
const MemoryGameOver = props => {
  const {level, replay} = props
  const replayed = () => {
    replay()
  }
  return (
    <div className="gameOver">
      <div className="gameOverEmojis">
        {emojisArray.map(every => (
          <div key={every.id}>
            <img src={every.img} alt={every} className="gameOverEmoji" />
          </div>
        ))}
      </div>

      <Line
        width="60vw"
        height="15px"
        percent={((level - 1) / 14) * 100}
        strokeWidth={1}
        strokeColor="#467aff"
        className="upper"
      />

      <div className="gameOverEmojis">
        <p>Level 1</p>
        <p>Level 5</p>
        <p>Level 10</p>
        <p>Level 15</p>
      </div>
      <h1 className="congrats">Congratulations</h1>
      <h1>You have reached level {level - 1}</h1>
      <div>
        <button onClick={replayed} type="button" className="memoryStart">
          Play Again
        </button>
      </div>
    </div>
  )
}

export default MemoryGameOver
