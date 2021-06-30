import React, { useState, useEffect, useCallback } from 'react'
import Card from './components/Card'

export default function WordCard(props: WordProps) {
  const { list, total, updateList } = props
  const [index, setIndex] = useState(0)
  const [word, setWord] = useState({})

  const handleWordIndexChange = useCallback((type: 'next' | 'prev') => {
    setIndex((prevCount) => {
      let newIndex
      if (type === 'next') {
        newIndex = prevCount === list.length - 1 ? 0 : prevCount + 1
      } else {
        newIndex = prevCount === 0 ? list.length - 1 : prevCount - 1
      }
      return newIndex
    })
  }, [index])

  // (type: 'next' | 'prev') => {
  //   setIndex((prevCount) => {
  //     let newIndex
  //     if (type === 'next') {
  //       newIndex = prevCount === list.length - 1 ? 0: prevCount + 1
  //     } else {
  //       newIndex = prevCount === 0 ? list.length - 1 : prevCount - 1
  //     }
  // 		return newIndex;
  //   })
  // }

  // const memoWord = (params) => {

  // }

  useEffect(() => {
    setWord(list[index])
    console.log(index)
  }, [index])

  return (
    <div>
      <Card word={word} changeWord={handleWordIndexChange}></Card>
      <div onClick={handleWordIndexChange}>Option + N 下一个</div>
      <div>Option + P 上一个</div>
      <div>Option + D 听写</div>
    </div>
  )
}
