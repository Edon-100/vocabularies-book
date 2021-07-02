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

  useEffect(() => {
    const keyEvent = (e: any) => {
      const char = e.key
      if (isLegal(char) && !e.altKey && !e.ctrlKey && !e.metaKey) {
        setInputWord((value) => (value += char))
        playKeySound()
      }
    }
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
      <div className={`'card' ${hasWrong ? 'wrong' : ''}`}>
        {word?.text.split('').map((l, index) => (
          <Letter
            letter={l}
            visible={statesList[index] === 'correct' ? true : false}
          ></Letter>
        ))}
      </div>
    </div>
  )
}

export default React.memo(Card)

// export default function Card(props: CardProps) {
// 	console.log('card update')
//   const { word, changeWord } = props

//   const audioRef = useRef<HTMLAudioElement>(null)
//   const inputRef = useRef<HTMLInputElement>(null)
//   const [showInput, setShowInput] = useState(false)

//   useEffect(() => {
//     const keyEvent = (e) => {
//       if (80 == e.keyCode && e.shiftKey) {
//         changeWord('prev')
//         // audioRef?.current?.play()
//       }
//       if (78 == e.keyCode && e.shiftKey) {
//         changeWord('next')
//         // audioRef?.current?.play()
//       }
//       if (82 == e.keyCode && e.shiftKey) {
//         audioRef?.current?.play()
//       }
//       if (73 == e.keyCode && e.shiftKey) {
//         setShowInput(!showInput)
//         setTimeout(() => {
//           inputRef?.current?.focus()
//         }, 0)
//       }
//     }
//     document.addEventListener('keydown', keyEvent)
//     return () => {
//       document.removeEventListener('keydown', keyEvent)
//     }
//   }, [])

// 	useEffect(() => {
// 		audioRef?.current?.play()
// 	}, [word])

//   const handleInputSubmit = (e) => {
//     if (e.keyCode === 13) {
//       if (inputRef?.current?.value === word.text) {
//         utools.showNotification('拼写正确')
//       } else {
//         utools.showNotification('拼写错误')
//       }
//     }
//   }

//   return (
//     <div className="single_card_wrapper">
//       <audio
//         src={`https://dict.youdao.com/dictvoice?audio=${word.text}`}
//         ref={audioRef}
//       ></audio>
//       {showInput && (
//         <input
//           type="text"
//           className="dictation"
//           ref={inputRef}
//           onKeyDown={(e) => handleInputSubmit(e)}
//         />
//       )}
//       <div className="card">{word.text}</div>
//     </div>
//   )
