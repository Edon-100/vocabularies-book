import React, { useState, useEffect, useCallback } from 'react'
import Card from './components/card-item'
import './index.less'

export default function WordCard(props: WordProps) {
  const { list = [], total, updateList } = props
  const [index, setIndex] = useState(0)
  const [word, setWord] = useState<Word>()

  const handleWordIndexChange = useCallback(
    (type: 'next' | 'prev') => {
      setIndex((prevCount) => {
        let newIndex
        if (type === 'next') {
          newIndex = prevCount === list.length - 1 ? 0 : prevCount + 1
        } else {
          newIndex = prevCount === 0 ? list.length - 1 : prevCount - 1
        }
        return newIndex
      })
    },
    [index]
  )

  useEffect(() => {
    setWord(list[index])
  }, [index])

  useEffect(() => {
    if (list.length) {
      setWord(list[index])
    }
  }, [list])

  return (
    <div className="card-page">
      <div className="setting">开始</div>
      <Card word={word} changeWord={handleWordIndexChange}></Card>
      {/* <div onClick={handleWordIndexChange}>Option + N 下一个</div> */}
    </div>
  )
}
