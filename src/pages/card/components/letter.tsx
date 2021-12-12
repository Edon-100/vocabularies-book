import React from 'react'
import { LetterProps } from 'src/types/common'
import './letter.less'

export default function Letter({
  letter,
  visible = false,
  mode = 'visible'
}: LetterProps) {
  return (
    <span className={`letter ${visible ? 'right' : ''}`}>
      {mode === 'visible' || visible ? letter : '_'}
    </span>
  )
}
