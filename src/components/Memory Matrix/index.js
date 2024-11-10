import Popup from 'reactjs-popup'
import {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {IoMdClose} from 'react-icons/io'

import './index.css'

const MemoryMatrix = () => {
  const [gridSize, setGridSize] = useState(3) // Start with 3x3 grid
  const [highlightedCells, setHighlightedCells] = useState([])
  const [clickedCells, setClickedCells] = useState([])
  const [showGrid, setShowGrid] = useState(false)
  const [level, setLevel] = useState(1)
  const [message, setMessage] = useState('')
  const maxLevel = Number(localStorage.getItem('maxLevel') || 0)
  const [rulesPage, setRulesPage] = useState(true) // Show rules initially
  const [home, setHome] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  if (level > maxLevel) {
    localStorage.setItem('maxLevel', level)
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
            setLevel(level + 1)
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

  const width = level * 4

  const lower = {
    width: '60vw',
    height: '20px',
    borderRadius: '20px',
    backgroundColor: 'aliceblue',
  }

  const upper = {
    width: `${width}vw`,
    height: '20px',
    borderRadius: '20px',
    backgroundColor: '#467aff',
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
              alt="done"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/07%20Grimmace.svg"
              alt="done"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/_@2x.svg"
              alt="done"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/03%20Optimistic.svg"
              alt="done"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/halfteeth.svg"
              alt="done"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/05%20Laugh.svg"
              alt="done"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/02%20Happy.svg"
              alt="done"
              className="gameOverEmoji"
            />
          </div>
          <div>
            <img
              src="https://ik.imagekit.io/sdce03tuc/_.svg"
              alt="done"
              className="gameOverEmoji"
            />
          </div>
        </div>
        <div style={lower}>
          <div style={upper}> </div>
        </div>
        <div className="gameOverEmojis">
          <p>Level 1</p>
          <p>Level 5</p>
          <p>Level 10</p>
          <p>Level 15</p>
        </div>
        <p className="congrats">Congratulations!</p>
        <p>You have reached level {level}</p>
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
                <img
                  className="rockArrowImg"
                  alt="i"
                  src="https://ik.imagekit.io/sdce03tuc/arrow-left%20(1).svg"
                />
                Back
              </button>
            </div>
          </div>
          <div>
            <h1>Memory Matrix</h1>
            <div>
              <img
                src="https://ik.imagekit.io/sdce03tuc/memory.svg"
                alt="memory"
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
              <Popup
                modal
                trigger={
                  <button
                    className="matrixRulesBtn"
                    data-testid="hamburgerIconButton"
                    type="button"
                  >
                    Rules
                  </button>
                }
                className="popup-content"
              >
                {close => (
                  <>
                    <div className="modal">
                      <button
                        className="close"
                        data-testid="closeButton"
                        type="button"
                        onClick={close}
                      >
                        <IoMdClose />{' '}
                      </button>
                    </div>
                    <div>
                      <h3 className="modalRules">Rules</h3>
                      <ul className="rockUl">
                        <li className="modalLi">
                          In each level, users will see a grid starting at 3x3,
                          with N cells highlighted.
                        </li>
                        <li className="modalLi">
                          The highlighted cells will be visible for N seconds,
                          during which no action can be performed.
                        </li>
                        <li className="modalLi">
                          After N seconds, the grid will hide the highlighted
                          cells, allowing you to select them.
                        </li>
                        <li className="modalLi">
                          Clicking on a previously highlighted cell will turn it
                          blue; clicking elsewhere will turn it red.
                        </li>
                        <li className="modalLi">
                          If all highlighted cells are selected in one attempt,
                          you will move to the next level.
                        </li>
                        <li className="modalLi">
                          The game ends if a non-highlighted cell is clicked,
                          taking you to the results page.
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </Popup>
            </div>
          </div>
          <h1 className="memoryHeading">Memory Matrix Game</h1>
          <div className="levelRowSpaceDiv">
            <h4 className="level">Level: {level}</h4>
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
