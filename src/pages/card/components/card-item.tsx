import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect
} from 'react'
import Letter from './letter'
import useKeySound from '../../../hooks/useSounds'
import { isLegal, playWordPronunciation } from 'src/utils'
import './card-item.less'

/* 
      if (80 == e.keyCode && e.shiftKey) {
        changeWord('prev')
      }
      if (78 == e.keyCode && e.shiftKey) {
        changeWord('next')
      }
      if (82 == e.keyCode && e.shiftKey) {
        audioRef?.current?.play()
      }
      if (73 == e.keyCode && e.shiftKey) {
        setShowInput(!showInput)
        setTimeout(() => {
          inputRef?.current?.focus()
        }, 0)
      }

*/

const Card = (props: CardProps) => {
  const { word, changeWord = () => {} } = props
  const { playKeySound, playBeepSound, playSuccessSound } = useKeySound()

  const audioRef = useRef<HTMLAudioElement>(null)
  const [inputWord, setInputWord] = useState('')
  const [hasWrong, setHasWrong] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [statesList, setStatesList] = useState<LetterState[]>([])
  const keyEvent = (e: any) => {
    const char = e.key
    if (isLegal(char) && !e.altKey && !e.ctrlKey && !e.metaKey) {
      console.log(inputWord)
      // setInputWord((value) => (value += char))
      // let inputWord += (char as any)
      let new2 = inputWord
      setInputWord((new2 += char))
      playKeySound()
    }
    if (e.keyCode === 8) {
      setInputWord((value) => {
        return value.substr(0, value.length - 1)
      })
      playKeySound()
    }
  }

  useEffect(() => {
    ;(window as any).word = word
    document.addEventListener('keydown', keyEvent)
    return () => {
      document.removeEventListener('keydown', keyEvent)
    }
  }, [])

  useLayoutEffect(() => {
    let hasWrong = false,
      wordLength = word?.text.length || 0,
      inputWordLength = inputWord.length
    const statesList: LetterState[] = []
    if (!wordLength) return

    for (let i = 0; i < wordLength && i < inputWordLength; i++) {
      if (word?.text[i] === inputWord[i]) {
        statesList.push('correct')
      } else {
        hasWrong = true
        statesList.push('wrong')
        setHasWrong(true)
        break
      }
    }
    if (!hasWrong && inputWordLength >= wordLength) {
      setIsFinish(true)
    }
    setStatesList(statesList)
  }, [inputWord])

  useEffect(() => {
    audioRef?.current?.play()
    // playWordPronunciation(word?.text)
  }, [word])

  useEffect(() => {
    if (isFinish) {
      playSuccessSound()
      changeWord('next')
      setIsFinish(false)
      setInputWord('')
      // 要开启
      window.services.wordModel.addWordToNextLevel(word!.text)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinish])

  useEffect(() => {
    if (hasWrong) {
      playBeepSound()
      setTimeout(() => {
        setInputWord('')
        setHasWrong(false)
      }, 300)
    }
  }, [hasWrong, isFinish, playBeepSound])

  return (
    <div className="single_card_wrapper">
      <audio
        src={`https://dict.youdao.com/dictvoice?audio=${word?.text}`}
        ref={audioRef}
      ></audio>
      <div className="card">
        <div className={` letter_wrapper ${hasWrong ? 'wrong' : ''}`}>
          {word?.text.split('').map((l, index) => (
            <Letter
              letter={l}
              visible={statesList[index] === 'correct' ? true : false}
            ></Letter>
          ))}
        </div>
        <div
          className="desc">
          {word?.youdao.web[0].value.join('; ')}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Card)
