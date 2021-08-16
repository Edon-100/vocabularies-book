import React from 'react'
import Card from './components/list-item'
import useSounds from 'src/hooks/useSounds'
import './index.less'

class WordList extends React.Component<WordProps> {
  render() {
    const { list, total, updateList } = this.props
    return (
      <div className="review">
        <div>待复习列表:{total}</div>
        <div className="words-cards-wrapper">
          {!!list.length &&
            list.map((item: Word) => (
              <Card word={item} updateList={updateList} key={item.text}></Card>
            ))}
        </div>
      </div>
    )
  }
}

export default WordList
