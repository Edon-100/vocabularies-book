import React from 'react'
import './letter.less'

export default function Letter({ letter, visible = false }: LetterProps) {
  return <span className="letter">{visible ? letter : '_'}</span>
}
