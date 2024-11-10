import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import EmojiGamePage from './EmojiGamePage'

import './index.css'

const EmojiGame = props => {
  const {emojisList} = props
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
    <div className="emojiPageMainDiv">
      {isTrue ? (
        <div>
          <EmojiGamePage setIsTrue={setIsTrue} emojisList={emojisList} />
        </div>
      ) : (
        <div>
          <div className="buttonDiv">
            <button className="backBtn" onClick={goToHome} type="button">
              <img
                className="arrowImg"
                alt="i"
                src="https://ik.imagekit.io/sdce03tuc/arrow-left.svg?updatedAt=1730197320814"
              />
              Back
            </button>
          </div>
          <div className="rulesDiv">
            <div>
              <img
                alt="images"
                src="https://ik.imagekit.io/sdce03tuc/Group%207471.svg"
              />
            </div>
            <div className="rulesContainer">
              <h2 className="rulesHeading">Rules</h2>
              <ul>
                <li className="li">
                  User should be able to see the list of Emojis
                </li>
                <li className="li">
                  When the user clicks any one of the Emoji for the first time,
                  then the count of the score should be incremented by 1 and the
                  List of emoji cards should be shuffled.
                </li>
                <li className="li">
                  This process should be repeated every time the user clicks on
                  an emoji card
                </li>
                <li className="li">
                  When the user clicks on all Emoji cards without clicking any
                  of it twice, then the user will win the game
                </li>
                <li className="li">
                  When the user clicks on the same Emoji for the second time,
                  then the user will lose the game.
                </li>
                <li className="li">
                  Once the game is over, the user will be redirected to the
                  results page.
                </li>
              </ul>
              <button
                className="startPlayingBtn"
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

export default EmojiGame
