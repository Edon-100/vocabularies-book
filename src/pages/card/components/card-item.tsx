import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef
} from 'react'
import Letter from './letter'
import useKeySound from '../../../hooks/useSounds'
import { isLegal, playWordPronunciation } from 'src/utils'
import './card-item.less'

const PKey = 80
const RKey = 82
const NKey = 78
const DelKey = 8
// const PKey = 82
const Card = (props: CardProps, cRef:any) => {
  const { word, changeWord = () => {}, showTranslate, mode } = props
  const { playKeySound, playBeepSound, playSuccessSound } = useKeySound()

  const audioRef = useRef<HTMLAudioElement>(null)
  const [inputWord, setInputWord] = useState('')
  const inputWordRef = useRef({ input: '' })
  const [hasWrong, setHasWrong] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [statesList, setStatesList] = useState<LetterState[]>([])
  const [banOnInput, setBanOnInput] = useState(false)
  const keyEvent = (e: any) => {
    if (banOnInput) return
    const char = e.key
    if (isLegal(char) && !e.altKey && !e.ctrlKey && !e.metaKey) {
      setInputWord((inputWord) => (inputWord += char))
      playKeySound()
    }
    if (e.keyCode === DelKey) {
      setInputWord((value) => {
        return value.substr(0, value.length - 1)
      })
      playKeySound()
    }
    if (PKey == e.keyCode && e.shiftKey) {
      changeWord('prev')
    }
    if (NKey == e.keyCode && e.shiftKey) {
      changeWord('next')
    }
    if (RKey == e.keyCode && e.shiftKey) {
      audioRef?.current?.play()
    }
  }
  useEffect(() => {
    audioRef?.current?.play()
    // playWordPronunciation(word?.text)
  }, [word])

  useImperativeHandle(cRef, () => ({
    playWordSound: () => {
      audioRef?.current?.play()
    }
  }));

  useEffect(() => {
    document.addEventListener('keydown', keyEvent)
    return () => {
      document.removeEventListener('keydown', keyEvent)
    }
  }, [word])

  useLayoutEffect(() => {
    inputWordRef.current.input = inputWord
    let hasWrong = false,
      wordLength = word?.text.length || 0,
      inputWordLength = inputWord.length
    const statesList: LetterState[] = []
    if (!wordLength) return
    console.log('inputWord', inputWordRef.current.input)
    for (let i = 0; i < wordLength && i < inputWordLength; i++) {
      if (word?.text == '' || word?.text[i].toUpperCase() === inputWord[i].toUpperCase()) {
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
    if (isFinish) {
      setTimeout(() => {
        playSuccessSound()
        changeWord('next')
        setIsFinish(false)
        setInputWord('')
        setInputWord((inputWord) => {
          if (word?.learn.level !== 'done') {
            // window.services.wordModel.addWordBackPreviousLevel(inputWord)
          }
          setStatesList([])
          return inputWord
        })
      }, 600)

      // 要开启
      console.log('单词升做下一个等级')
      // window.services.wordModel.addWordToNextLevel(word!.text)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinish])

  useEffect(() => {
    if (banOnInput) return
    if (hasWrong) {
      setBanOnInput(true)
      playBeepSound()
      setTimeout(() => {
        setInputWord('')
        setHasWrong(false)
        setBanOnInput(false)
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
              wrong={hasWrong}
              key={index}
              mode={mode as 'visible' | 'hidden'}
              letter={l}
              visible={statesList[index] === 'correct' ? true : false}
            ></Letter>
          ))}
        </div>
        {showTranslate && (
          <div className="desc">
            {word?.youdao?.basic?.explains?.map((text) => <div>{text}</div>) ||
              word?.translation}
          </div>
        )}
      </div>
    </div>
  )
}

export default forwardRef(Card)