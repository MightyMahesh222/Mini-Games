import Modal from 'react-modal'
import {useState, useEffect, useCallback} from 'react'
import {Redirect} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import {Line} from 'rc-progress'

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

const MemoryMatrix = () => {
  const [gridSize, setGridSize] = useState(3) // Start with 3x3 grid
  const [highlightedCells, setHighlightedCells] = useState([])
  const [clickedCells, setClickedCells] = useState([])
  const [showGrid, setShowGrid] = useState(false)
  const [levelNumber, setLevel] = useState(1)
  const [message, setMessage] = useState('')
  const maxLevel = Number(localStorage.getItem('maxLevel') || 0)
  const [rulesPage, setRulesPage] = useState(true) // Show rules initially
  const [home, setHome] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  if (levelNumber > maxLevel) {
    localStorage.setItem('maxLevel', levelNumber)
  }

  const highlightRandomCells = () => {
    const totalCells = gridSize * gridSize
    const randomCells = new Set()

    while (randomCells.size < gridSize) {
      const randomIndex = Math.floor(Math.random() * totalCells)
      randomCells.add(randomIndex)
    }

    setHighlightedCells([...randomCells])
    setShowGrid(true)

    setTimeout(() => {
      if (!rulesPage) {
        setShowGrid(false)
      }
    }, 1000 * gridSize)
  }

  const handleCellClick = index => {
    if (!showGrid && !clickedCells.includes(index)) {
      if (highlightedCells.includes(index)) {
        setClickedCells(prev => [...prev, index])
        if (clickedCells.length + 1 === highlightedCells.length) {
          setMessage('Well done! Moving to the next level.')
          setTimeout(() => {
            setGridSize(gridSize + 1)
            setClickedCells([])
            setMessage('')
            setLevel(levelNumber + 1)
          }, 1000)
        }
      } else {
        setGameOver(true)
      }
    }
  }

  const goToHome = () => {
    setHome(true)
  }

  const goToRules = () => {
    setRulesPage(true)
  }

  const startPlaying = () => {
    setRulesPage(false)
  }

  useEffect(() => {
    setClickedCells([])
    highlightRandomCells()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize, rulesPage])

  const renderCell = index => {
    const isHighlighted = highlightedCells.includes(index) && showGrid
    const isCorrect = clickedCells.includes(index)

    const cellClassNames = `cell ${isHighlighted ? 'highlight' : ''} ${
      isCorrect ? 'correct' : ''
    }`

    return (
      <div
        key={`cell-${index}`}
        role="button"
        data-test-id="highlighted"
        disabled={isCorrect}
        tabIndex={0}
        onClick={() => handleCellClick(index)}
        className={cellClassNames}
      >
        {' '}
      </div>
    )
  }

  const replayMatrix = () => {
    setGameOver(false)
    setLevel(1)
    setGridSize(3)
    setClickedCells([])
    setHighlightedCells([])
    setMessage('')
    highlightRandomCells()
  }

  if (home) {
    return <Redirect to="/" />
  }

  if (gameOver) {
    return (
      <div className="gameOver">
        <div className="gameOverEmojis">
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/05%20Pokerface.svg"
              alt="neutral face"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/07%20Grimmace.svg"
              alt="grimacing face"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/_@2x.svg"
              alt="slightly smiling face"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/03%20Optimistic.svg"
              alt="grinning face with big eyes"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/halfteeth.svg"
              alt="grinning face with smiling eyes"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/05%20Laugh.svg"
              alt="beaming face with smiling eyes"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/02%20Happy.svg"
              alt="grinning face"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/_.svg"
              alt="smiling face with sunglasses"
              className="gameOverEmoji"
            />
          </div>
        </div>

        <Line
          width="60vw"
          height="15px"
          percent={levelNumber > 1 ? levelNumber * 4 : 0}
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
        <h1>You have reached level {levelNumber}</h1>
        <div>
          <button onClick={replayMatrix} type="button" className="memoryStart">
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="game">
      {rulesPage ? (
        <div>
          <div className="rockRowSpaceDiv">
            <div className="buttonDiv">
              <button className="rockBackBtn" onClick={goToHome} type="button">
                <BiArrowBack className="rockArrowImg" />
                Back
              </button>
            </div>
          </div>
          <div>
            <h1>Memory Matrix</h1>
            <div>
              <img
                src="https://ik.imagekit.io/sdce03tuc/memory.svg"
                alt="memory matrix"
              />
            </div>
            <div className="matrixRulesContainer">
              <h4 className="rockRulesHeading">Rules</h4>
              <ul className="rockUl">
                <li className="rockLi">
                  In each level, users will see a grid starting at 3x3, with N
                  cells highlighted.
                </li>
                <li className="rockLi">
                  At N seconds, the user can click on any cell. Clicking on a
                  cell that was highlighted before it will turn blue. Clicking
                  on the other cells that were not highlighted before then will
                  turn to red.
                </li>
                <li className="rockLi">
                  The highlighted cells will be visible for N seconds, during
                  which no action can be performed.
                </li>
                <li className="rockLi">
                  After N seconds, the grid will hide the highlighted cells,
                  allowing you to select them.
                </li>
                <li className="rockLi">
                  Clicking on a previously highlighted cell will turn it blue;
                  clicking elsewhere will turn it red.
                </li>
                <li className="rockLi">
                  If all highlighted cells are selected in one attempt, you will
                  move to the next level.
                </li>

                <li className="rockLi">
                  The game ends if a non-highlighted cell is clicked, taking you
                  to the results page.
                </li>
              </ul>
              <div>
                <button
                  className="memoryStart"
                  onClick={startPlaying}
                  type="button"
                >
                  Start Playing
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="matrixRowSpaceDiv">
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
                className="matrixRulesBtn"
                data-testid="hamburgerIconButton"
                type="button"
                onClick={openModal}
              >
                Rules
              </button>
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
                      data-testid="close"
                      type="button"
                      onClick={closeModal}
                      className="close"
                    >
                      <CgClose />{' '}
                    </button>
                  </div>
                  <ul className="rockUl">
                    <li className="modalLi">
                      In each level, users will see a grid starting at 3x3, with
                      N cells highlighted.
                    </li>
                    <li className="modalLi">
                      At N seconds, the user can click on any cell. Clicking on
                      a cell that was highlighted before it will turn blue.
                      Clicking on the other cells that were not highlighted
                      before then will turn to red.
                    </li>
                    <li className="modalLi">
                      The highlighted cells will be visible for N seconds,
                      during which no action can be performed.
                    </li>
                    <li className="modalLi">
                      After N seconds, the grid will hide the highlighted cells,
                      allowing you to select them.
                    </li>
                    <li className="modalLi">
                      Clicking on a previously highlighted cell will turn it
                      blue; clicking elsewhere will turn it red.
                    </li>
                    <li className="modalLi">
                      If all highlighted cells are selected in one attempt, you
                      will move to the next level.
                    </li>
                    <li className="modalLi">
                      The game ends if a non-highlighted cell is clicked, taking
                      you to the results page.
                    </li>
                  </ul>
                </Modal>
              </div>
            </div>
          </div>
          <h1 className="memoryHeading">Memory Matrix Game</h1>
          <div className="levelRowSpaceDiv">
            <p className="level">Level - {levelNumber}</p>
            <h4 className="level">
              Max Level - {maxLevel > 9 ? maxLevel : `0${maxLevel}`}
            </h4>
          </div>

          <div
            className="grid"
            style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}
          >
            {Array.from({length: gridSize * gridSize}).map((_, index) =>
              renderCell(index),
            )}
          </div>

          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  )
}

export default MemoryMatrix
