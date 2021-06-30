import React, { useEffect, useRef, useState } from 'react'
import './Card.less'

const Card = (props: CardProps) => {
  console.log('card update')
  const { word, changeWord } = props

  const audioRef = useRef<HTMLAudioElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    const keyEvent = (e) => {
      if (80 == e.keyCode && e.shiftKey) {
        changeWord('prev')
        // audioRef?.current?.play()
      }
      if (78 == e.keyCode && e.shiftKey) {
        changeWord('next')
        // audioRef?.current?.play()
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
    }
    document.addEventListener('keydown', keyEvent)
    return () => {
      document.removeEventListener('keydown', keyEvent)
    }
  }, [])

  useEffect(() => {
    audioRef?.current?.play()
  }, [word])

  const handleInputSubmit = (e) => {
    if (e.keyCode === 13) {
      if (inputRef?.current?.value === word.text) {
        utools.showNotification('拼写正确')
      } else {
        utools.showNotification('拼写错误')
      }
    }
  }

  return (
    <div className="single_card_wrapper">
      <audio
        src={`https://dict.youdao.com/dictvoice?audio=${word.text}`}
        ref={audioRef}
      ></audio>
      {showInput && (
        <input
          type="text"
          className="dictation"
          ref={inputRef}
          onKeyDown={(e) => handleInputSubmit(e)}
        />
      )}
      <div className="card">{word.text}</div>
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
// }
