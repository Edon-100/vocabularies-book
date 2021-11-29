import React, { useState, useEffect, useCallback, useRef } from 'react'
import Card from './components/card-item'
import './index.less'
import Tooltip from 'rc-tooltip'
import { playWordPronunciation } from 'src/utils'

const TKey = 84

// export default function WordCard(props: WordProps) {
export default function WordCard(props: any) {
  const { list = [], total, updateList, allWords } = props
  const [index, setIndex] = useState(0)
  const [word, setWord] = useState<Word>()
  const [showTranslate, setShowTranslate] = useState(false)
  const [mode, setMode] = useState<'hidden' | 'visible'>('hidden')
  const [listType, setListType] = useState<'PART' | 'ALL'>('PART')
  const [currentList, setCurrentList] = useState<Word[]>([])

  const handleWordIndexChange = useCallback(
    (type: 'next' | 'prev') => {
      if (type === 'prev' && index === 0) return
      setIndex((prevCount) => {
        let newIndex
        if (type === 'next') {
          newIndex = prevCount === currentList.length - 1 ? 0 : prevCount + 1
        } else {
          newIndex = prevCount === 0 ? currentList.length - 1 : prevCount - 1
        }
        return newIndex
      })
    },
    [index, currentList]
  )

  const keyEvent = (e: any) => {
    if (TKey == e.keyCode && e.shiftKey) {
      setShowTranslate((showTranslate) => !showTranslate)
    }
  }

  useEffect(() => {
    console.log(currentList, index);
    setWord(currentList[index])
  }, [index, currentList])

  useEffect(() => {
    if (list.length && allWords?.length) {
      const current = listType === 'ALL' ? allWords : list 
      setCurrentList(current)
      setIndex(0)
    }
  }, [list, allWords, listType])

  useEffect(() => {
    document.addEventListener('keydown', keyEvent)
    return () => {
      document.removeEventListener('keydown', keyEvent)
    }
  }, [word])

  const playWordSound = () => {
    playWordPronunciation(word!.text)
  }

  const switchMode = () => {
    setMode((mode) => {
      return mode === 'hidden' ? 'visible' : 'hidden'
    })
  }

  return (
    <div className="card-page">
      <div className="setting">
        {/* <div className="setting-item translation">中</div> */}
        <Tooltip
          overlay="模式切换"
          overlayStyle={{ transform: 'scale(.8)' }}
          placement="bottom"
        >
          <i
            className={`iconfont ${
              mode === 'visible' ? 'icon-visible' : 'icon-invisible'
            }`}
            title="模式切换"
            onClick={() => switchMode()}
          ></i>
        </Tooltip>

        <Tooltip
          overlay={
            <>
              <div>显示/隐藏 翻译</div>
              <div>cmd + shift + T</div>
            </>
          }
          overlayStyle={{ transform: 'scale(.8)' }}
          placement="bottom"
        >
          <i
            className={`iconfont icon-translate ${
              showTranslate ? 'showTranslate' : ''
            }`}
            title="翻译"
            onClick={() => setShowTranslate((show) => !show)}
          ></i>
        </Tooltip>
        <Tooltip
          overlay={
            <>
              <div>播放声音</div>
              <div>cmd + shift + R</div>
            </>
          }
          overlayStyle={{ transform: 'scale(.8)' }}
          placement="bottom"
        >
          <i
            className="iconfont icon-player"
            onClick={() => playWordSound()}
          ></i>
        </Tooltip>
        <Tooltip
          overlay={
            <>
              <div>下一个</div>
              <div>cmd + shift + N</div>
            </>
          }
          overlayStyle={{ transform: 'scale(.8)' }}
          placement="bottom"
        >
          <i
            className="iconfont icon-right"
            onClick={() => handleWordIndexChange('next')}
          ></i>
        </Tooltip>
        <Tooltip
          overlay={
            <>
              <div>上一个</div>
              <div>cmd + shift + P</div>
            </>
          }
          overlayStyle={{ transform: 'scale(.8)' }}
          placement="bottom"
        >
          <i
            className="iconfont icon-left"
            onClick={() => handleWordIndexChange('prev')}
          ></i>
        </Tooltip>
        <Tooltip
          overlay={listType === 'ALL' ? '目前听写所有单词' : '目前只听写需要学习的单词'}
          overlayStyle={{ transform: 'scale(.8)' }}
          placement="bottom"
        >
          <div
            onClick={() =>
              setListType((type) => (type === 'PART' ? 'ALL' : 'PART'))
            }
          >
            {listType}
          </div>
        </Tooltip>
      </div>
      <Card
        mode={mode}
        word={word}
        changeWord={handleWordIndexChange}
        showTranslate={showTranslate}
        playWordSound={playWordSound}
      ></Card>
      {/* <div onClick={handleWordIndexChange}>Option + N 下一个</div> */}
    </div>
  )
}
