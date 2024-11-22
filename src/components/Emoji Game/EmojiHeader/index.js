import './index.css'

const Header = props => {
  const localScore = localStorage.getItem('localScore') || 0
  const {score, gameOver} = props
  return (
    <div className="emojiHeaderDiv">
      <div className="scoreDiv">
        <img
          className="emojiHeaderImg"
          alt="emoji logo"
          src="https://ik.imagekit.io/sdce03tuc/wink%201.jpg"
        />
        <h1 className="emojiName">Emoji Game</h1>
      </div>
      {!gameOver && (
        <div className="scoreDiv">
          <p className="topScore">Top Score : {localScore}</p>
          <p className="topScore">Score: {score}</p>
        </div>
      )}
    </div>
  )
}

export default Header
