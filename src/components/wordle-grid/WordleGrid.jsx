import React from "react";
import "./WordleGrid.scss";

const WordleGrid = ({ guessWord, guessWordList, wordOfTheDay }) => {
  const getCellColor = (letter, position) => {
    if (!wordOfTheDay) return "";
    if (wordOfTheDay[position] === letter) return "green";
    if (wordOfTheDay.includes(letter)) return "orange";
    return "grey";
  };

  const fullGuessList = [...guessWordList, guessWord];

  return (
    <div className="wordle-grid">
      {Array.from({ length: 6 }).map((_, rowIndex) => {
        const word = fullGuessList[rowIndex] || "";
        return (
          <div key={rowIndex} className="wordle-row">
            {Array.from({ length: 5 }).map((_, colIndex) => (
              <div
                key={colIndex}
                className={`wordle-cell ${getCellColor(word[colIndex], colIndex)}`}
              >
                {word[colIndex]}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(WordleGrid);
