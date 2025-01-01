import Modal from 'react-modal'
import {useState, useCallback} from 'react'
import {CgClose} from 'react-icons/cg'
import EmojiHeader from '../EmojiHeader'
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

const EmojiGamePage = props => {
  const {emojisList, setIsTrue} = props

  const localScore = localStorage.getItem('localScore') || 0
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [myEmojis, setEmojis] = useState(emojisList)
  const [ClickedEmojiIds, setClickedEmojis] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  const playAgain = () => {
    setGameOver(false)
    setScore(0)
    setClickedEmojis([])
  }
  const addToClicked = id => {
    setClickedEmojis(prev => [...prev, id])
  }

  const shuffleEmojis = () => {
    setEmojis(prev => prev.sort(() => Math.random() - 0.5))
  }

  const goBack = () => {
    setIsTrue(false)
  }

  const addToClickedEmojis = id => {
    const isEmojiPresent = ClickedEmojiIds.includes(id)
    if (isEmojiPresent) {
      setGameOver(true)
      if (localScore < score) {
        localStorage.setItem('localScore', score)
      }
    } else {
      if (emojisList.length - 1 === score) {
        setGameOver(true)
        if (localScore < ClickedEmojiIds.length) {
          localStorage.setItem('localScore', 12)
        }
      }
      setScore(prev => prev + 1)
      addToClicked(id)
      shuffleEmojis()
    }
  }

  return (
    <div className="emojiPageMainDiv">
      <EmojiHeader score={score} gameOver={gameOver} />
      {gameOver ? (
        <div>
          {score === emojisList.length ? (
            <div className="winLoseDiv">
              <div className="scoreDetails">
                <h2 className="youLose">You Won</h2>
                <p className="bestScore">Best Score</p>
                <p className="finalScore">{score}/12</p>
                <button onClick={playAgain} className="playAgain" type="button">
                  Play Again
                </button>
              </div>
              <div>
                <img
                  className="winLoseImg"
                  alt="won"
                  src="https://ik.imagekit.io/sdce03tuc/Image.svg"
                />
              </div>
            </div>
          ) : (
            <div className="winLoseDiv">
              <div className="scoreDetails">
                <h2 className="youLose">You Lose</h2>
                <div className="normalEmojiDiv">
                  {score === emojisList.length ? (
                    <div>
                      <img
                        src="https://ik.imagekit.io/sdce03tuc/02%20Happy.svg"
                        alt="won"
                        className="gameOverEmoji"
                      />
                      <img
                        src="https://ik.imagekit.io/sdce03tuc/02%20Happy.svg"
                        alt="won"
                        className="gameOverEmoji"
                      />
                      <img
                        src="https://ik.imagekit.io/sdce03tuc/02%20Happy.svg"
                        alt="won"
                        className="gameOverEmoji"
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src="https://ik.imagekit.io/sdce03tuc/05%20Pokerface.svg"
                        alt="won"
                        className="gameOverEmoji"
                      />
                      <img
                        src="https://ik.imagekit.io/sdce03tuc/05%20Pokerface.svg"
                        alt="won"
                        className="gameOverEmoji"
                      />
                      <img
                        src="https://ik.imagekit.io/sdce03tuc/05%20Pokerface.svg"
                        alt="won"
                        className="gameOverEmoji"
                      />
                    </div>
                  )}
                </div>
                <p className="bestScore">Score</p>
                <p className="finalScore">{score}/12</p>
                <button onClick={playAgain} className="playAgain" type="button">
                  Play Again
                </button>
              </div>
              <div>
                <img
                  className="winLoseImg"
                  alt="lose"
                  src="https://ik.imagekit.io/sdce03tuc/Image%20(1).svg"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="emojiContainer">
          <div className="rowSpaceDiv">
            <div className="backButtonDiv">
              <button className="backBtn" onClick={goBack} type="button">
                <img
                  className="arrowImg"
                  alt="i"
                  src="https://ik.imagekit.io/sdce03tuc/arrow-left.svg?updatedAt=1730197320814"
                />
                Back
              </button>
            </div>

            <button
              className="emojiRulesBtn"
              data-testid="hamburgerIconButton"
              type="button"
              onClick={openModal}
            >
              Rules
            </button>
          </div>
          <div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Information Modal"
            >
              <h3 className="modalRules">Rules</h3>
              <div className="modal">
                <button
                  type="button"
                  onClick={closeModal}
                  className="close"
                  data-testid="close"
                >
                  <CgClose />
                  Close
                </button>
              </div>
              <ul className="rockUl">
                <li className="modalLi">
                  This process should be repeated every time the user clicks on
                  an emoji card
                </li>
                <li className="modalLi">
                  When the user clicks any one of the Emoji for the first time,
                  then the count of the score should be incremented by 1 and the
                  List of emoji cards should be shuffled.
                </li>
                <li className="modalLi">
                  When the user clicks on all Emoji cards without clicking any
                  of it twice, then the user will win the game
                </li>
                <li className="modalLi">
                  When the user clicks on the same Emoji for the second time,
                  then the user will lose the game.
                </li>
                <li className="modalLi">
                  Once the game is over, the user will be redirected to the
                  results page.
                </li>
                <li className="modalLi">
                  User should be able to see the list of Emojis
                </li>
              </ul>
            </Modal>
          </div>

          <ul className="emojisDiv">
            {myEmojis.map(every => (
              <li className="removeDot" key={every.id}>
                <button
                  onClick={() => addToClickedEmojis(every.id)}
                  type="button"
                  className="emojiDiv"
                >
                  <img
                    className="emoji"
                    alt={every.emojiName}
                    src={every.emojiUrl}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default EmojiGamePage
