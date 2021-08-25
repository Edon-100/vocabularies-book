import React, { useState, useRef } from 'react'
import Tooltip from 'rc-tooltip'
import { Dialog } from 'src/components/dialog'
import './list-item.less'
import useKeySound from 'src/hooks/useSounds'

export default function Card({ word, updateList = () => {} }: CardProps) {
  const [showTranslate, setShowTranslate] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { playKeySound, playBeepSound, playSuccessSound } = useKeySound()

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
    playSuccessSound();
    window.services.wordModel.addWordToNextLevel(text)
    updateList()
  }

  const handleback = (text = '') => {
    console.log('降级')
    playBeepSound();
    window.services.wordModel.addWordBackPreviousLevel(text)
    updateList()
  }

  const showDeleteModal = () => {
    setShowDeleteDialog(true)
  }

  return (
    <div className="list-item">
      {showDeleteDialog && (
        <Dialog
          visible={showDeleteDialog}
          onOk={() => handleDelete()}
          onCancel={() => setShowDeleteDialog(false)}
        ></Dialog>
      )}
      <audio
        src={`https://dict.youdao.com/dictvoice?audio=${word?.text}`}
        ref={audioRef}
      ></audio>
      <p className="word">
        {word?.text}
        <span className="phonetic">
          {word?.youdao?.basic?.phonetic
            ? `[${word?.youdao?.basic?.phonetic}]`
            : ''}
        </span>
      </p>
      <Tooltip overlay={`遗忘曲线等级: ${(word?.learn.level as number) + 1}`} overlayStyle={{ transform: 'scale(.8)' }} placement="top">
        <div className="level">
          <i className={`iconfont icon-level-${(word?.learn.level as number) + 1}`}></i>
          {/* &nbsp;{word?.learn.level} */}
        </div>
      </Tooltip>
      {/* <div className="time">
        <i className="iconfont icon-time"></i>&nbsp;{dayjs(word?.learn.learnDate).format('YYYY-MM-DD hh:mm:ss')}
      </div> */}
      <div className="operate">
        <div>
          <Tooltip overlay="播放" overlayStyle={{ transform: 'scale(.8)' }}>
            <i className="iconfont icon-player" onClick={handleAudioPlay}></i>
          </Tooltip>
          <Tooltip
            placement="left"
            overlay="显示/隐藏 翻译"
            overlayStyle={{ transform: 'scale(.8)' }}
          >
            <i
              className="iconfont icon-translate"
              onClick={hanleShowTranslate}
            ></i>
          </Tooltip>
        </div>
        <div>
          <Tooltip
            placement="left"
            overlay="记得"
            overlayStyle={{ transform: 'scale(.8)' }}
          >
            <i
              className="iconfont icon-check"
              onClick={() => handleLevelUp(word?.text)}
            ></i>
          </Tooltip>
          <Tooltip
            placement="left"
            overlay="忘记"
            overlayStyle={{ transform: 'scale(.8)' }}
          >
            <i
              className="iconfont icon-close"
              onClick={() => handleback(word!.text)}
            ></i>
          </Tooltip>
          <Tooltip
            placement="left"
            overlay="删除"
            overlayStyle={{ transform: 'scale(.8)' }}
          >
            <i className="iconfont icon-delete" onClick={showDeleteModal}></i>
          </Tooltip>
        </div>
      </div>
      {showTranslate && (
        <div className="translation">
          {word?.youdao?.basic?.explains?.map((text) => <div>{text}</div>) ||
            word?.translation}
        </div>
      )}
    </div>
  )
}
