import React from 'react'
import Card from './components/Card'
import './index.less'

class WordList extends React.Component<WordProps> {
  render() {
    const { list, total, updateList } = this.props
    return (
      <div className="review">
        <div>总条数:{total}</div>
        <div className="words-cards-wrapper">
          {list.map((item: any) => (
            <Card word={item} updateList={updateList}></Card>
          ))}
        </div>
      </div>
    )
  }
}

export default WordList
