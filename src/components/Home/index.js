import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <div className="homeDiv">
    <div>
      <h1 className="gamesHeading">Games</h1>
      <ul className="gamesPreviewDiv">
        <li className="homeLi">
          <Link to="/emoji-game">
            <button className="gameImageDiv" type="button">
              <img
                className="emojiImg"
                alt="emoji game"
                src="https://ik.imagekit.io/sdce03tuc/Group%207471.svg"
              />
            </button>
          </Link>
        </li>
        <li className="homeLi">
          <Link to="/memory-matrix">
            <button className="gameImageDiv" type="button">
              <p className="memoryMatrixHeading">MEMORY MATRIX</p>
              <img
                className="emojiImg"
                alt="memory matrix"
                src="https://ik.imagekit.io/sdce03tuc/memory.svg"
              />
            </button>
          </Link>
        </li>
        <li className="homeLi">
          <Link to="/rock-paper-scissor">
            <button className="gameImageDiv" type="button">
              <p className="memoryMatrixHeading">ROCK PAPER SCISSOR</p>
              <img
                className="emojiImg"
                alt="rock paper scissor"
                src="https://ik.imagekit.io/sdce03tuc/Group%207469.svg?updatedAt=1729916331466"
              />
            </button>
          </Link>
        </li>
        <li className="homeLi">
          <Link to="/card-flip-memory-game">
            <button className="gameImageDiv" type="button">
              <img
                className="emojiImgAnimal"
                alt="card flip memory game"
                src="https://ik.imagekit.io/sdce03tuc/animals%20(1).svg"
              />
            </button>
          </Link>
        </li>
      </ul>
    </div>
  </div>
)

export default Home
