import React, { useState, useRef } from 'react'
import dayjs from 'dayjs'
import './list-item.less'

export default function Card({ word, updateList = () => {} }: CardProps) {
  const [showTranslate, setShowTranslate] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  const hanleShowTranslate = () => {
    setShowTranslate(showTranslate => !showTranslate)
  }

  const handleAudioPlay = () => {
    audioRef?.current?.play()
  }

  const handleDelete = async (text: string) => {
    console.log('删除')
    await window.services.wordModel.deleteMaterialObj(text)
    updateList()
  }

  const handleLevelUp = (text = '') => {
    window.services.wordModel.addWordToNextLevel(text)
    console.log('升级')
    updateList()
  }

  const handleback = (text = '') => {
    console.log('降级')
    window.services.wordModel.addWordBackPreviousLevel(text)
    updateList()
  }

  return (
    <div className="list-card">
      <div className="card-header">
        <h3>{word?.text}</h3>
        <audio
          src={`https://dict.youdao.com/dictvoice?audio=${word?.text}`}
          ref={audioRef}
        ></audio>
        <span>{word?.youdao?.basic?.phonetic}</span>
        <div className="btn_groups">
        <i className="iconfont icon-laba" onClick={handleAudioPlay}></i>
        <i className={`iconfont icon-fanyi ${showTranslate ? 'showTranslate' : ''}`} onClick={hanleShowTranslate}></i>
        <i className="iconfont icon-shanchu delete" onClick={() => handleDelete(word!.text)}></i>
        </div>
      </div>
      {showTranslate && <div className="translation">{word?.translation}</div>}
      {/* <div>Level: {word?.learn.level} 待删</div> */}
      <div>
        上次学习时间:{' '}
        {dayjs(word?.learn.learnDate).format('YYYY-MM-DD')}
      </div>
      <span onClick={() => handleLevelUp(word?.text)} className="operate_btn">
        记得
      </span>
      <span onClick={() => handleback(word!.text)} className="operate_btn">
        忘记
      </span>
    </div>
  )
}
