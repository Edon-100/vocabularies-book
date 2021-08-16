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
  const inputWordRef = useRef({input:''});
  const [hasWrong, setHasWrong] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [statesList, setStatesList] = useState<LetterState[]>([])
  const keyEvent = (e: any) => {
    if (hasWrong) return;
    const char = e.key
    if (isLegal(char) && !e.altKey && !e.ctrlKey && !e.metaKey) {
      setInputWord(inputWord => inputWord+=char)
      playKeySound()
    }
    if (e.keyCode === 8) {
      setInputWord((value) => {
        return value.substr(0, value.length - 1)
      })
      playKeySound()
    }
    if (80 == e.keyCode && e.shiftKey) {
      changeWord('prev')
    }
    if (78 == e.keyCode && e.shiftKey) {
      changeWord('next')
    }
    if (82 == e.keyCode && e.shiftKey) {
      audioRef?.current?.play()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyEvent)
    return () => {
      document.removeEventListener('keydown', keyEvent)
    }
  }, [])

  useLayoutEffect(() => {
    inputWordRef.current.input = inputWord;
    let hasWrong = false,
      wordLength = word?.text.length || 0,
      inputWordLength = inputWord.length
    const statesList: LetterState[] = []
    if (!wordLength) return
    console.log('inputWord', inputWordRef.current.input)
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
      setTimeout(() => {
        playSuccessSound()
        changeWord('next')
        setIsFinish(false)
        setInputWord(word => {
          window.services.wordModel.addWordBackPreviousLevel(word)
          setStatesList([])
          return word
        })
      }, 1000)
      
      // 要开启
      console.log('单词升做下一个等级')
      // window.services.wordModel.addWordToNextLevel(word!.text)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinish])

  useEffect(() => {
    if (hasWrong) {
      playBeepSound()
      setTimeout(() => {
        setInputWord('')
        setHasWrong(false)
      }, 1000)
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
              key={index}
              mode="visible"
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
