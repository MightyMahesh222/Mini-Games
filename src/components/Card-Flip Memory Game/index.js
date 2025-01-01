import Modal from 'react-modal'
import {useState, useEffect, useCallback} from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import {Redirect} from 'react-router-dom'

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

const CardFlip = props => {
  const {cardsList} = props
  const [shuffledImages, setShuffledImages] = useState([])
  const [isSameClicked, setIsSameClicked] = useState([])
  const [rulesPage, setRulesPage] = useState(true)
  const [home, setHome] = useState(false)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [flipCount, setFlipCount] = useState(0)
  const recordScore = Number(localStorage.getItem('recordTime') || 0)
  const [time, setTime] = useState(120)
  const [gameStarted, setGameStarted] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  if (score === 10 && flipCount < recordScore) {
    localStorage.setItem('recordTime', Math.floor(flipCount))
  } else if (score === 10 && recordScore === 0) {
    localStorage.setItem('recordTime', Math.floor(flipCount))
  }

  console.log(shuffledImages)

  useEffect(() => {
    let intervalId
    if (gameStarted) {
      intervalId = setInterval(() => {
        setTime(prev => {
          if (prev > 0) {
            return prev - 1
          }
          clearInterval(intervalId)
          setGameOver(true)

          return 0
        })
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [gameStarted, time])

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  useEffect(() => {
    const duplicatedImages = [...cardsList, ...cardsList].map(
      (every, index) => {
        console.log(index)
        return {
          ...every,
          unqId: index,
          isActive: false,
          isMatched: false,
        }
      },
    )
    const shuffled = duplicatedImages.sort(() => Math.random() - 0.5)
    setShuffledImages(shuffled)
  }, [cardsList])

  useEffect(() => {
    if (score === 10) {
      setGameOver(true)
    }
    if (isSameClicked.length === 2) {
      const [firstOne, secondOne] = isSameClicked

      if (
        firstOne.imgName === secondOne.imgName &&
        firstOne.id !== secondOne.id
      ) {
        setScore(prev => prev + 1)
        const updatedImages = shuffledImages.map(every =>
          every.name === firstOne.imgName
            ? {...every, isActive: true, isMatched: true}
            : every,
        )
        setShuffledImages(updatedImages)
      } else {
        setTimeout(() => {
          const resetImages = shuffledImages.map(card =>
            card.unqId === firstOne.id || card.unqId === secondOne.id
              ? {...card, isActive: false}
              : card,
          )

          setShuffledImages(resetImages)
        }, 1000)
      }

      setIsSameClicked([])
    }
  }, [isSameClicked, score, flipCount, recordScore, shuffledImages])

  const imageClicked = (name, index) => {
    const newObject = {imgName: name, id: index}

    setFlipCount(prev => prev + 1)

    setIsSameClicked(prev => [...prev, newObject])
    setShuffledImages(prevImages =>
      prevImages.map(card =>
        card.unqId === index ? {...card, isActive: true} : card,
      ),
    )
  }

  const changeRules = () => {
    setRulesPage(false)
    setGameStarted(true)
  }

  const goToHome = () => {
    setHome(true)
  }

  const goToRules = () => {
    setRulesPage(true)
  }

  const replay = () => {
    setGameOver(false)
    setFlipCount(0)
    setTime(120)
    setScore(0)
    setIsSameClicked([])
    const duplicatedImages = [...cardsList, ...cardsList].map(
      (every, index) => ({
        ...every,
        unqId: index,
        isActive: false,
        isMatched: false,
      }),
    )
    const shuffled = duplicatedImages.sort(() => Math.random() - 0.5)
    setShuffledImages(shuffled)
    setGameStarted(true)
  }

  if (home) {
    return <Redirect to="/" />
  }

  if (gameOver) {
    return score === 10 ? (
      <div className="winCardDiv">
        <div>
          <img
            className="wonImageLast"
            src="https://ik.imagekit.io/sdce03tuc/03%20Optimistic.svg"
            alt="grinning face with big eyes"
          />
        </div>
        <h1 className="congratulations">Congratulations</h1>
        <p className="noFlips">No.of Flips - {Math.floor(flipCount / 2)}</p>
        <h1 className="infoMsg">You matched all of the cards in record time</h1>

        <div>
          <button onClick={replay} className="wonPlayAgain" type="button">
            Play Again
          </button>
        </div>
      </div>
    ) : (
      <div className="winCardDiv">
        <div>
          <img
            className="wonImageLast"
            src="https://ik.imagekit.io/sdce03tuc/05%20Pokerface.svg"
            alt="neutral face"
          />
        </div>
        <h1 className="congratulations">Better luck next time!</h1>
        <p className="noFlips">No.of Flips - {Math.floor(flipCount / 2)}</p>
        <h1 className="infoMsg">
          You did not match all of the cards in record time
        </h1>
        <div>
          <button onClick={replay} className="wonPlayAgain" type="button">
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {rulesPage ? (
        <div className="animalCardRulesDiv">
          <div className="rockRowSpaceDiv">
            <div className="buttonDiv">
              <button className="rockBackBtn" onClick={goToHome} type="button">
                <BiArrowBack className="rockArrowImg" />
                Back
              </button>
            </div>
          </div>
          <div>
            <img
              alt="card flip memory game"
              className="animalsImage"
              src="https://ik.imagekit.io/sdce03tuc/animals%20(1).svg"
            />
          </div>
          <div className="rulesPadding">
            <div className="matrixRulesContainer">
              <h1 className="rockRulesHeading">Rules</h1>
              <ul className="rockUl">
                <li className="rockLi">
                  When the game is started, the users should be able to see the
                  list of Cards that are shuffled and turned face down.
                </li>

                <li className="rockLi">
                  If the two cards have the same image, they remain face up. If
                  not, they should be flipped face down again after a short 2
                  seconds
                </li>
                <li className="rockLi">
                  When a user starts the game, the user should be able to see
                  the Timer running
                </li>
                <li className="rockLi">
                  When the user is not able to find all the cards before the
                  timer ends then the game should end and redirect to the Time
                  Up Page.
                </li>
                <li className="rockLi">
                  If the user finds all the matching cards before the timer
                  ends, then the user should be redirected to the results page.
                </li>
                <li className="rockLi">
                  Users should be able to compare only two cards at a time.
                </li>
                <li className="rockLi">The Timer starts from 2 Minutes. </li>
              </ul>
              <button
                className="rockPlayingBtn"
                onClick={changeRules}
                type="button"
              >
                Start playing
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cardMainDiv">
          <div>
            <ul className="rockRowSpaceDiv">
              <li className="buttonDiv removeDot">
                <button
                  className="rockBackBtn"
                  onClick={goToRules}
                  type="button"
                >
                  <BiArrowBack className="rockArrowImg" />
                  Back
                </button>
              </li>
              <div>
                <button
                  className="matrixRulesBtn"
                  data-testid="hamburgerIconButton"
                  type="button"
                  onClick={openModal}
                >
                  Rules
                </button>

                <>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Information Modal"
                  >
                    <div>
                      <h1 className="modalRules">Rules</h1>
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
                          When the game is started, the users should be able to
                          see the list of Cards that are shuffled and turned
                          face down.
                        </li>
                        <li className="modalLi">
                          Users should be able to compare only two cards at a
                          time.
                        </li>
                        <li className="modalLi">
                          When a user starts the game, the user should be able
                          to see the Timer running
                        </li>
                        <li className="modalLi">
                          When the user is not able to find all the cards before
                          the timer ends then the game should end and redirect
                          to the Time Up Page.
                        </li>
                        <li className="modalLi">
                          The Timer starts from 2 Minutes.
                        </li>
                        <li className="modalLi">
                          If the two cards have the same image, they remain face
                          up. If not, they should be flipped face down again
                          after a short 2 seconds
                        </li>

                        <li className="modalLi">
                          If the user finds all the matching cards before the
                          timer ends, then the user should be redirected to the
                          results page.
                        </li>
                      </ul>
                    </div>
                  </Modal>
                </>
              </div>
            </ul>
          </div>
          <div className="specialDiv">
            <h1 className="cardFlipHeading">Card-Flip Memory Game</h1>
            <p className="cardTimer">
              {minutes > 9 ? minutes : `0${minutes}`}:
              {seconds > 9 ? seconds : `0${seconds}`}
            </p>
            <ul className="cardScoreDiv">
              <li className="cardScore removeDot">
                <p>
                  Card flip count -{' '}
                  {Math.floor(flipCount / 2) > 9
                    ? Math.floor(flipCount / 2)
                    : `0${Math.floor(flipCount / 2)}`}
                </p>
              </li>
              <li className="cardScore removeDot">
                <p>
                  Lowest flip count -{' '}
                  {recordScore > 9 ? recordScore : ` 0${recordScore}`}
                </p>
              </li>
              <li className="cardScore removeDot">
                <p> Score - {score > 9 ? score : ` 0${score}`}</p>
              </li>
            </ul>
          </div>
          <div className="cardsContainer">
            {shuffledImages.map(every => (
              <ul key={every.unqId}>
                <li className="removeDot">
                  <button
                    data-testid={every.name}
                    disabled={every.isMatched}
                    type="button"
                    className={`cardDiv ${every.isActive ? 'flipped' : ''}`}
                    onClick={() => {
                      imageClicked(every.name, every.unqId)
                    }}
                  >
                    <div className="back">
                      <img
                        className="cardImage"
                        alt={every.name}
                        src={every.image}
                      />
                    </div>
                    <div className="front">
                      <img
                        className="cardImage"
                        alt={every.name}
                        src="https://ik.imagekit.io/sdce03tuc/foot-print%201.svg"
                      />
                    </div>
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CardFlip
