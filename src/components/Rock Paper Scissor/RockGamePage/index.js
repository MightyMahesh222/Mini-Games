import Modal from 'react-modal'
import {useState, useEffect, useCallback} from 'react'
import {IoMdClose} from 'react-icons/io'

import './index.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '80vw',
    maxWidth: '800px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

const RockGamePage = props => {
  const {choicesList, setIsTrue} = props
  const [userPick, setUserPick] = useState(null)
  const [isResult, setResult] = useState(true)
  const [randomPick, setRandomPick] = useState(null)
  const [isWon, setIsWon] = useState('')
  const [score, setScore] = useState(0)
  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  const goToRules = () => {
    setIsTrue(false)
  }
  console.log(userPick, randomPick)
  const userClicked = pick => {
    setUserPick(pick)
    setRandomPick(Math.floor(Math.random() * choicesList.length))
    setResult(false)
  }

  const playAgain = () => {
    setResult(true)
    setUserPick(null)
    setRandomPick(null)
    setIsWon('')
  }

  useEffect(() => {
    if (userPick !== null && randomPick !== null) {
      if (userPick === randomPick) {
        setIsWon('DRAW')
      } else if (
        (userPick === 0 && randomPick === 1) ||
        (userPick === 2 && randomPick === 0) ||
        (userPick === 1 && randomPick === 2)
      ) {
        setIsWon('WON')
        setScore(prev => prev + 1)
      } else {
        setIsWon('LOSE')
      }
    }
  }, [userPick, randomPick])

  let emoji
  let girlReaction
  let winorlose
  if (isWon === 'WON') {
    emoji = '😍'
    winorlose = 'YOU WON'
    girlReaction = 'https://ik.imagekit.io/sdce03tuc/Group%207618.svg'
  } else if (isWon === 'LOSE') {
    emoji = '☹️'
    winorlose = 'YOU LOSE'
    girlReaction = 'https://ik.imagekit.io/sdce03tuc/Group%207618%20(2).svg'
  } else {
    emoji = '😐'
    winorlose = 'IT IS DRAW'
    girlReaction = 'https://ik.imagekit.io/sdce03tuc/Group%207618%20(1).svg'
  }

  return isResult ? (
    <div className="rockGamePageDiv">
      <div className="rockRowSpaceDiv">
        <div className="buttonDiv">
          <button className="rockBackBtn" onClick={goToRules} type="button">
            <img
              className="rockArrowImg"
              alt="i"
              src="https://ik.imagekit.io/sdce03tuc/arrow-left%20(1).svg"
            />
            Back
          </button>
        </div>
        <div>
          <button
            className="rockRulesBtn"
            data-testid="hamburgerIconButton"
            type="button"
            onClick={openModal}
          >
            Rules
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Information Modal"
          >
            <div>
              <h3 className="modalRules">Rules</h3>
              <div className="modal">
                <button type="button" onClick={closeModal} className="close">
                  <IoMdClose />{' '}
                </button>
              </div>
              <ul className="rockUl">
                <li className="modalLi">
                  The game result should be based on user and user opponent
                  choices
                </li>
                <li className="modalLi">
                  When the user choice is rock and his opponent choice is rock
                  then the result will be<span> IT IS DRAW</span>
                </li>
                <li className="modalLi">
                  When the user choice is paper and his opponent choice is rock
                  then the result will be <span>YOU WON</span>
                </li>
                <li className="modalLi">
                  When the user choice is a scissor and his opponent choice is
                  rock then the result will be <span>YOU LOSE</span>
                </li>
                <li className="modalLi">
                  When the user choice is paper and his opponent choice is paper
                  then the result will be <span>IT IS DRAW</span>
                </li>
                <li className="modalLi">
                  When the user choice is scissors and his opponent choice is
                  paper then the result will be <span>YOU WON</span>
                </li>
                <li className="modalLi">
                  When the user choice is rock and his opponent choice is
                  scissors then the result will be<span> YOU WON</span>
                </li>
                <li className="modalLi">
                  When the user choice is paper and his opponent choice is
                  scissors then the result will be <span>YOU LOSE</span>
                </li>
                <li className="modalLi">
                  When the user choice is scissors and his opponent choice is
                  scissors then the result will be <span>IT IS DRAW</span>
                </li>
                <li className="modalLi">
                  When the result is YOU WON, then the count of the score should
                  be incremented by 1
                </li>
                <li className="modalLi">
                  When the result is IT IS DRAW, then the count of the score
                  should be the same
                </li>
                <li className="modalLi">
                  When the result is IT IS DRAW, then the count of the score
                  should be the same
                </li>
              </ul>
            </div>
          </Modal>
        </div>
      </div>

      <h2 className="rockPaperHeading">ROCK PAPER SCISSOR</h2>
      <h2 className="rockPaperHeading">Lets pick</h2>
      <div className="rockGameChooseDiv">
        {choicesList.map((every, index) => (
          <button
            onClick={() => userClicked(index)}
            type="button"
            className="imageBtn"
            key={every.id}
          >
            <img alt={every.id} className="rockImage" src={every.imageUrl} />
          </button>
        ))}
      </div>
    </div>
  ) : (
    <div className="rockResultDiv">
      <h2 className="rockPaperHeading">ROCK PAPER SCISSOR</h2>
      <div className="rockScoreDiv">
        <div>
          <p className="rockHeading">Rock</p>
          <p className="rockHeading">Paper</p>
          <p className="rockHeading">Scissor</p>
        </div>
        <div>
          <img className="girlReaction" alt="reaction" src={girlReaction} />
        </div>
        <div className="scoreDetailsDiv">
          <p className="rockScoreHeading">Score</p>
          <p className="rockScore">{score}</p>
        </div>
      </div>
      <div className="rockResultContainer">
        <div className="rockColumnDiv">
          <p>You</p>
          <img
            alt="userPick"
            className="rockImage"
            src={choicesList[userPick].imageUrl}
          />
        </div>
        <div className="rockColumnDiv">
          <p className="rockEmoji">{emoji}</p>
          <p className="youWon">{winorlose}</p>
          <button
            className="rockPlayAgainBtn"
            onClick={playAgain}
            type="button"
          >
            Play Again
          </button>
        </div>
        <div className="rockColumnDiv">
          <p>Opponent</p>
          <img
            className="rockImage"
            alt="done"
            src={choicesList[randomPick].imageUrl}
          />
        </div>
      </div>
    </div>
  )
}
export default RockGamePage
