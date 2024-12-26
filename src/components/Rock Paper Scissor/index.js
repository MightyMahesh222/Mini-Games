import {useState} from 'react'
import {BiArrowBack} from 'react-icons/bi'
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
              <BiArrowBack className="rockArrowImg" />
              Back
            </button>
          </div>
          <div className="rockRulesDiv">
            <div>
              <h1 className="rockPaperHeading">Rock Paper Scissor</h1>
              <img
                className="rockRulesImage"
                alt="rock paper scissor"
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
                  then the result will be IT IS DRAW
                </li>
                <li className="rockLi">
                  When the user choice is paper and his opponent choice is rock
                  then the result will be YOU WON
                </li>
                <li className="rockLi">
                  When the user choice is a scissor and his opponent choice is
                  rock then the result will be YOU LOSE
                </li>
                <li className="rockLi">
                  When the user choice is paper and his opponent choice is paper
                  then the result will be IT IS DRAW
                </li>
                <li className="rockLi">
                  When the user choice is scissors and his opponent choice is
                  paper then the result will be YOU WON
                </li>
                <li className="rockLi">
                  When the user choice is rock and his opponent choice is
                  scissors then the result will be YOU WON
                </li>
                <li className="rockLi">
                  When the user choice is paper and his opponent choice is
                  scissors then the result will be YOU LOSE
                </li>
                <li className="rockLi">
                  When the user choice is scissors and his opponent choice is
                  scissors then the result will be IT IS DRAW
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
                  When the result is IT IS LOSE, then the count of the score
                  should be decremented by 1.
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
