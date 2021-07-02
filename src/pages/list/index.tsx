import React from 'react'
import Card from './components/list-item'
import useSounds from 'src/hooks/useSounds'
import './index.less'

class WordList extends React.Component<WordProps> {
  render() {
    const { list, total, updateList } = this.props
    return (
      <div className="review">
        <div>总条数:{total}</div>
        <div className="words-cards-wrapper">
          {!!list.length &&
            list.map((item: Word) => (
              <Card word={item} updateList={updateList}></Card>
            ))}
        </div>
      </div>
    )
  }
}

export default WordList
