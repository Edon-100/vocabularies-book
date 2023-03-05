import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from 'react'
import Letter from './letter'
import { useKeySoudIns } from '../../../hooks/useSounds'
import { isLegal, playWordPronunciation } from 'src/utils'
import './card-item.less'
import { LetterState } from 'src/types/common'
import { CardProps } from 'src/types/Word'

const PKey = 80
const RKey = 82
const NKey = 78
const DelKey = 8
// const PKey = 82
const Card = (props: CardProps, cRef:any) => {
  const { word, changeWord = () => {}, showTranslate, mode, updateList } = props
  const { playKeySound, playBeepSound, playSuccessSound } = useKeySoudIns

  // const audioRef = useRef<HTMLAudioElement>(null)
  const [inputWord, setInputWord] = useState('')
  const inputWordRef = useRef({ input: '' })
  const [hasWrong, setHasWrong] = useState(false)
  const [isFinish, setIsFinish] = useState(false)
  const [statesList, setStatesList] = useState<LetterState[]>([])
  const [banOnInput, setBanOnInput] = useState(false)
  const keyEvent = (e: KeyboardEvent) => {
    if (banOnInput) return
    const char = e.key
    if (isLegal(char) && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      setInputWord((inputWord) => (inputWord += char))
      playKeySound()
    }
    if (e.key === 'Backspace') {
      setInputWord((value) => {
        return value.substr(0, value.length - 1)
      })
      playKeySound()
    }
    if (e.shiftKey && e.key === '<') {
      changeWord('prev')
    }
    if (e.shiftKey && e.key === '>') {
      changeWord('next')
    }
    if (e.shiftKey && e.key === 'P') {
      playWordPronunciation(word?.affix.text)
    }
  }
  useEffect(() => {
    // audioRef?.current?.play()
    word && playWordPronunciation(word?.affix.text)
  }, [word])

  // useImperativeHandle(cRef, () => ({
  //   playWordSound: () => {
  //     audioRef?.current?.play()
  //   }
  // }));

  useEffect(() => {
    document.addEventListener('keydown', keyEvent)
    return () => {
      document.removeEventListener('keydown', keyEvent)
    }
  }, [word])

  useLayoutEffect(() => {
    inputWordRef.current.input = inputWord
    let hasWrong = false,
      wordLength = word?.affix.text.length || 0,
      inputWordLength = inputWord.length
    const statesList: LetterState[] = []
    if (!wordLength) return
    for (let i = 0; i < wordLength && i < inputWordLength; i++) {
      if (word?.affix.text == '' || word?.affix.text[i].toUpperCase() === inputWord[i].toUpperCase()) {
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
          setStatesList([])
          return inputWord
        })
      }, 600)

      // 要开启
      console.log('单词升做下一个等级')
      //TODO: 单词升级到下一级 
      updateList && updateList()
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
      <div className="card">
        <div className={` letter_wrapper ${hasWrong ? 'wrong' : ''}`}>
          {word?.affix.text.split('').map((l, index) => (
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
            {word?.affix.explains?.map((text) => <div key={text}>{text}</div>)}
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
