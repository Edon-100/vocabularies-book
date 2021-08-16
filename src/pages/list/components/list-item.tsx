import React, { useState, useRef } from 'react'
import { Dialog } from 'src/components/dialog'
import dayjs from 'dayjs'
import './list-item.less'

export default function Card({ word, updateList = () => {} }: CardProps) {
  const [showTranslate, setShowTranslate] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const hanleShowTranslate = () => {
    setShowTranslate((showTranslate) => !showTranslate)
  }

  const handleAudioPlay = () => {
    audioRef?.current?.play()
  }

  const handleDelete = async () => {
    console.log('删除')
    await window.services.wordModel.deleteMaterialObj(word!.text)
    updateList()
    setShowDeleteDialog(false)
  }

  const handleLevelUp = (text = '') => {
    console.log('升级')
    window.services.wordModel.addWordToNextLevel(text)
    updateList()
  }

  const handleback = (text = '') => {
    console.log('降级')
    window.services.wordModel.addWordBackPreviousLevel(text)
    updateList()
  }

  const showDeleteModal = () => {
    setShowDeleteDialog(true)
  }

  return (
    <div className="list-card">
      {showDeleteDialog && <Dialog visible={showDeleteDialog} onOk={() => handleDelete()} onCancel={() => setShowDeleteDialog(false)}></Dialog>}
      <div className="card-header">
        <h3>{word?.text}</h3>
        <audio
          src={`https://dict.youdao.com/dictvoice?audio=${word?.text}`}
          ref={audioRef}
        ></audio>
        <span>{word?.youdao?.basic?.phonetic}</span>
        <div className="btn_groups">
          <i className="iconfont icon-laba" onClick={handleAudioPlay}></i>
          <i
            className={`iconfont icon-fanyi ${
              showTranslate ? 'showTranslate' : ''
            }`}
            onClick={hanleShowTranslate}
          ></i>
          <i
            className="iconfont icon-shanchu delete"
            onClick={() => showDeleteModal()}
          ></i>
        </div>
      </div>
      {showTranslate && (
        <div className="translation">
          {word?.youdao?.basic?.explains?.map((text) => <div>{text}</div>) ||
            word?.translation}
        </div>
      )}
      <div>Level: {word?.learn.level} 待删</div>
      <div>
        复习时间: {dayjs(word?.learn.learnDate).format('YYYY-MM-DD hh:mm:ss')}
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
