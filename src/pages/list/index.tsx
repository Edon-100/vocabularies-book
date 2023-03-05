import React, { useEffect, useState, useCallback } from 'react'
import { ListItem } from './components/list-item'
import { useKeySoudIns } from 'src/hooks/useSounds'
import { playWordPronunciation } from 'src/utils'
import './index.less'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWordList, selectWord, wordSlice } from 'src/store/word'
import { IWord } from 'src/types/Word'
const KeyR = 82
const KeyF = 70
const KeyP = 80
const KeyT = 84

const { playBeepSound, playSuccessSound } = useKeySoudIns

export const WordList = () => {
  const { reviewList, reviewCount, loading } = useSelector(selectWord)
  const dispatch = useDispatch()
  const [showFirstWordTranslate, setShowFirstWordTranslate] = useState(false)

  useEffect(() => {
    document.addEventListener('keydown', keyEvent)
    return () => {
      document.removeEventListener('keydown', keyEvent)
    }
  }, [reviewList, reviewList])

  const keyEvent = (e: any) => {
    if (!reviewCount) return
    if (e.keyCode === KeyR && e.shiftKey) {
      playSuccessSound()
      // TODO: addWordToNextLevel(reviewList[0].text)
      dispatch(fetchWordList())
      setShowFirstWordTranslate(false)
    }
    if (e.keyCode === KeyF && e.shiftKey) {
      playBeepSound()
      // TODO: addWordToPreviousLevel(reviewList[0].text)
      setShowFirstWordTranslate(true)
      // this.props.updateList!()
      dispatch(fetchWordList())
    }
    if (e.keyCode === KeyP && e.shiftKey) {
      playWordPronunciation(reviewList[0].affix.text)
    }
    if (e.keyCode === KeyT && e.shiftKey) {
      setShowFirstWordTranslate((show) => !show)
    }
  }

  if (loading)  {
    return <div className="words-cards-wrapper" style={{height: '100vw', display: 'flex', alignItems: 'center'}}>
      <h2>loading...</h2>
    </div>
  }

  return (
    <div className="words-cards-wrapper">
      {!!reviewCount &&
        reviewList.map((item: IWord, index: any) => (
          <ListItem
            word={item}
            key={item.affix.text}
            showFirstWordTranslate={index === 0 && showFirstWordTranslate}
          ></ListItem>
        ))}
      {!reviewCount && <h3>请先添加单词</h3>}
    </div>
  )
}
