import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import RockGamePage from './RockGamePage'
import './index.css'

const RockPaper = props => {
  const {choicesList} = props
  const [isTrue, setIsTrue] = useState(false)
  const [isBack, setIsBack] = useState(false)
  const startPlaying = () => {
    setIsTrue(true)
  }
  const goToHome = () => setIsBack(true)
  if (isBack) {
    return <Redirect to="/" />
  }
  return (
    <div className="rockPageMainDiv">
      {isTrue ? (
        <div>
          <RockGamePage setIsTrue={setIsTrue} choicesList={choicesList} />
        </div>
      ) : (
        <div>
          <div className="buttonDiv">
            <button className="rockBackBtn" onClick={goToHome} type="button">
              <img
                className="rockArrowImg"
                alt="i"
                src="https://ik.imagekit.io/sdce03tuc/arrow-left%20(1).svg"
              />
              Back
            </button>
          </div>
          <div className="rockRulesDiv">
            <div>
              <h2 className="rockPaperHeading">ROCK PAPER SCISSOR</h2>
              <img
                className="rockRulesImage"
                alt="images"
                src="https://ik.imagekit.io/sdce03tuc/Group%207469.svg?updatedAt=1729916331466"
              />
            </div>
            <div className="rockRulesContainer">
              <h2 className="rockRulesHeading">Rules</h2>
              <ul className="rockUl">
                <li className="rockLi">
                  The game result should be based on user and user opponent
                  choices
                </li>
                <li className="rockLi">
                  When the user choice is rock and his opponent choice is rock
                  then the result will be<span> IT IS DRAW</span>
                </li>
                <li className="rockLi">
                  When the user choice is paper and his opponent choice is rock
                  then the result will be <span>YOU WON</span>
                </li>
                <li className="rockLi">
                  When the user choice is a scissor and his opponent choice is
                  rock then the result will be <span>YOU LOSE</span>
                </li>
                <li className="rockLi">
                  When the user choice is paper and his opponent choice is paper
                  then the result will be <span>IT IS DRAW</span>
                </li>
                <li className="rockLi">
                  When the user choice is scissors and his opponent choice is
                  paper then the result will be <span>YOU WON</span>
                </li>
                <li className="rockLi">
                  When the user choice is rock and his opponent choice is
                  scissors then the result will be<span> YOU WON</span>
                </li>
                <li className="rockLi">
                  When the user choice is paper and his opponent choice is
                  scissors then the result will be <span>YOU LOSE</span>
                </li>
                <li className="rockLi">
                  When the user choice is scissors and his opponent choice is
                  scissors then the result will be <span>IT IS DRAW</span>
                </li>
                <li className="rockLi">
                  When the result is YOU WON, then the count of the score should
                  be incremented by 1
                </li>
                <li className="rockLi">
                  When the result is IT IS DRAW, then the count of the score
                  should be the same
                </li>
                <li className="rockLi">
                  When the result is IT IS DRAW, then the count of the score
                  should be the same
                </li>
              </ul>
              <button
                className="rockPlayingBtn"
                onClick={startPlaying}
                type="button"
              >
                Start Playing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RockPaper
