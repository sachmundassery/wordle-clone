import React, {useCallback, useEffect, useState} from 'react'
import WordleGrid from "../wordle-grid/WordleGrid.jsx";

const Wordle = () => {

  const [wordOfTheDay, setWordOfTheDay] = useState(null)
  const [guessWord, setGuessWord] = useState('')
  const [guessWordsList, setGuessWordsList] = useState([])
  const [isFinal, setIsFinal] = useState(false)

  useEffect(() => {
    fetch("https://cheaderthecoder.github.io/5-Letter-words/words.json")
      .then((response) => response.json())
      .then((data) =>{
        const words = data.words
        setWordOfTheDay(words[Math.floor(Math.random() * words.length)])
      })
      .catch((error) => console.error("Error fetching words:", error));
  }, []);


  useEffect(() => {
    function handleKeyDown(event){
      if(event.code.startsWith("Key") && guessWord.length < 5 && wordOfTheDay !== guessWordsList[guessWordsList.length -1]){
        setGuessWord(prevState => prevState+event.key)
        setIsFinal(false)

      }else if(event.code.startsWith("Enter") && guessWord.length === 5){
        setGuessWordsList(prevState => [...prevState,guessWord])
        setGuessWord([])
        setIsFinal(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown )
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  },[guessWord])

  const renderWordleGrid = useCallback(() => {
    return <div>
      <WordleGrid guessWord={guessWord} guessWordList={guessWordsList} wordOfTheDay={wordOfTheDay} isFinal={isFinal}/>
    </div>
  },[guessWord,wordOfTheDay])
  return (
    wordOfTheDay && renderWordleGrid()
  )
}
export default Wordle;