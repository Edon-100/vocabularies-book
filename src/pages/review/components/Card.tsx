import React, { useState, useRef } from 'react'
import './card.less'

export default function Card({ word, updateList }: CardProps) {
  const [showTranslate, setShowTranslate] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const hanleShowTranslate = () => {
    setShowTranslate(!showTranslate)
  }

  const handleAudioPlay = () => {
    audioRef?.current?.play()
  }

  const handleDelete = async (text: string) => {
    await window.services.WordsDB.deleteMaterialObj(text);
    updateList();
  }

  return (
    <div className="card">
      <div className="header">
        <h3>{word.text}</h3>
        <audio
          src={`https://dict.youdao.com/dictvoice?audio=${word.text}`}
          ref={audioRef}
        ></audio>
        <span>{word?.youdao?.basic?.phonetic}</span>
        <button onClick={handleAudioPlay} className="play">
          Play
        </button>
      </div>
      {showTranslate && <div className="translation">{word.translation}</div>}
      <button onClick={hanleShowTranslate}>toggle Translation</button>
      <button className="delete_btn" onClick={() => handleDelete(word.text)}>
        Del
      </button>
    </div>
  )
}
