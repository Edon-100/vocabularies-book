import React from 'react'
import WordList from './pages/list'
import WordCard from './pages/card'
import './index.less'
import ErrorBoundary from './components/ErrorBoundaries'

export default class App extends React.Component<any, HomeState> {
  state = {
    total: 0,
    list: [],
    wordType: 'list',
    action: {
      code: '',
      type: '',
      payload: {},
      optional: []
    } as UtoolsAction
  }

  componentDidMount() {
    utools.onPluginEnter((action) => {
      if (action.code === 'add_vocabulary') {
        window.services.wordModel.addVocabulary().then((res) => {
          this.updateWordsListToState()
        })
      } else {
        this.updateWordsListToState()
      }
    })
  }

  updateWordsListToState = () => {
    const list = window.services.wordModel.getMaterials()
    const total = list?.length
    this.setState({
      total,
      list
    })
  }

  switchWordType = (wordType: string) => {
    this.setState({
      wordType
    })
  }

  render() {
    const { wordType } = this.state
    return (
      <ErrorBoundary>
        <div className="switch_btn">
          <button onClick={() => this.switchWordType('list')}>List 模式</button>
          <button onClick={() => this.switchWordType('card')}>Card 模式</button>
        </div>
        {wordType === 'list' ? (
          <WordList
            list={this.state.list}
            total={this.state.total}
            updateList={this.updateWordsListToState}
          />
        ) : (
          <WordCard
            list={this.state.list}
            total={this.state.total}
            updateList={this.updateWordsListToState}
          />
        )}
      </ErrorBoundary>
    )
  }
}
