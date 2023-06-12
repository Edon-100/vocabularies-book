import React, { useState, useEffect, useCallback, useRef } from 'react'
import Card from './components/card-item'
import './index.less'
import Tooltip from 'rc-tooltip'
import { isMac, playWordPronunciation } from 'src/utils'
import { useDispatch, useSelector } from 'react-redux'
import { selectWord } from 'src/store/word'

const TKey = 84

export default function WordCard() {
  const { reviewList, reviewCount, loading, allWordCount, allWordList } = useSelector(selectWord)
  
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

  const keyEvent = (e: KeyboardEvent) => {
    if ('T' === e.key && e.shiftKey) {
      setShowTranslate((showTranslate) => !showTranslate)
    }
    if ('M' === e.key && e.shiftKey) {
      switchMode()
    }
  }

  useEffect(() => {
    console.log(currentList, index);
    setWord(currentList[index])
  }, [index, currentList])

  useEffect(() => {
    window.posthog.capture('pageview', { user: utools?.getUser()?.nickname })
  }, [])

  useEffect(() => {
    if (reviewCount && allWordCount) {
      const current = listType === 'ALL' ? allWordList : reviewList 
      setCurrentList(current)
      setIndex(0)
    }
  }, [reviewList, allWordList, listType])

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
          overlay={
            <>
              <div>模式切换</div>
              <div>shift + M</div>
            </>
          }          
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
              <div>shift + T</div>
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
              <div>shift + P</div>
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
              <div>{'shift + >'}</div>
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
              <div>{'shift + <'}</div>
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
        word={word!}
        changeWord={handleWordIndexChange}
        showTranslate={showTranslate}
        playWordSound={playWordSound}
      ></Card>
      {/* <div onClick={handleWordIndexChange}>Option + N 下一个</div> */}
    </div>
  )
}
