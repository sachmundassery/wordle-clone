import React from "react"
import "./WordleGrid.scss"

const WordleGrid = ({guessWord, guessWordList, wordOfTheDay, isFinal}) => {


  console.log(wordOfTheDay)
  const getCellColor = (letter, position) => {
    if (wordOfTheDay.charAt(position) === letter) {
      return "green"
    } else if (wordOfTheDay.includes(letter)) {
      return "orange"
    } else {
      return "grey"
    }
  }
  const renderGrid = () => {
    guessWordList = [...guessWordList, guessWord]

    return Array.from({length: 6}, (_, rowIndex) => {
      const word = guessWordList[rowIndex] ?? ''
      return <div key={`row-${rowIndex}`} className="wordle-row">
        {Array.from({length: 5}, (_, colIndex) => {
          return <div key={`cell-${rowIndex}-${colIndex}`}
                      className={`wordle-cell ${wordOfTheDay && guessWord  && guessWordList.length > 0 && getCellColor(word[colIndex], colIndex)}`}>
            {word[colIndex]}
          </div>
        })}
      </div>
    });
  }

  return <div className="wordle-grid">{renderGrid()}</div>;
};

export default React.memo(WordleGrid)