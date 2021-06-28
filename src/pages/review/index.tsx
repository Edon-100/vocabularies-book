import React from 'react'
import Card from './components/Card'
import './index.less'
class Review extends React.Component {
  state = {
    total: 0,
    list: []
  }

  componentDidMount() {
    utools.onPluginEnter((action) => {
      if (action.code === 'add_vocabulary') {
        window.services.add_vocabulary().then((res) => {
          this.updateWordsListToPage()
        })
      } else {
        this.updateWordsListToPage()
      }
    })
  }

  updateWordsListToPage = () => {
    const list = utools?.db?.get('ReviewDbName')?.list || []
    const total = list?.length
    this.setState({
      total,
      list
    })
  }

  render() {
    return (
      <div className="review">
        <div>总条数:{this.state.total}</div>
        <div className="words-cards-wrapper">
          {this.state.list.map((item: any) => (
            <Card word={item} updateList={this.updateWordsListToPage}></Card>
          ))}
        </div>
      </div>
    )
  }
}

export default Review
