import React from 'react'
import Card from './components/list-item'
import './index.less'

class WordList extends React.Component<WordProps> {
  render() {
    const { list, total, updateList } = this.props
    return (
      <div className="words-cards-wrapper">
        {!!list.length &&
          list.map((item: Word) => (
            <Card word={item} updateList={updateList} key={item.text}></Card>
          ))}
      </div>
    )
  }
}

export default WordList
