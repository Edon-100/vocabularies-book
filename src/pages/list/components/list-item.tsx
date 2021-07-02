import React, { useState, useRef } from 'react'
import dayjs from 'dayjs'
import './list-item.less'

export default function Card({ word, updateList = () => {} }: CardProps) {
  const [showTranslate, setShowTranslate] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const hanleShowTranslate = () => {
    setShowTranslate(!showTranslate)
  }

  const handleAudioPlay = () => {
    audioRef?.current?.play()
  }

  const handleDelete = async (text: string) => {
    await window.services.wordModel.deleteMaterialObj(text)
    updateList()
  }

  const handleLevelUp = (text = '') => {
    window.services.wordModel.addWordToNextLevel(text)
    updateList()
  }

  const handleback = (text = '') => {
    window.services.wordModel.addWordBackPreviousLevel(text)
    updateList()
  }

  return (
    <div className="list-card">
      <div className="header">
        <h3>{word?.text}</h3>
        <audio
          src={`https://dict.youdao.com/dictvoice?audio=${word?.text}`}
          ref={audioRef}
        ></audio>
        <span>{word?.youdao?.basic?.phonetic}</span>
        <button onClick={handleAudioPlay} className="play">
          Play
        </button>
      </div>
      {showTranslate && <div className="translation">{word?.translation}</div>}
      <div>Level: {word?.learn.level}</div>
      <div>
        learn time: {dayjs(word?.learn.learnDate).format('YYYY-MM-DD HH:mm:ss')}
      </div>
      <button onClick={hanleShowTranslate}>toggle Translation</button>
      <button className="delete_btn" onClick={() => handleDelete(word!.text)}>
        Del
      </button>
      <button onClick={() => handleback(word!.text)}>
        backPreLevel
      </button>
      <button onClick={() => handleLevelUp(word?.text)}>level up</button>
    </div>
  )
}
