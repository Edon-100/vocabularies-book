import React from 'react'
import WordList from './pages/WordList'
import WordCard from './pages/WordCard'
import './index.less'
import ErrorBoundary from './components/ErrorBoundaries'

export default class App extends React.Component<null, HomeState> {
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
        window.services.add_vocabulary().then((res) => {
          this.updateWordsListToState(action)
        })
      } else {
        this.updateWordsListToState(action)
      }
    })
  }

  updateWordsListToState = (action: UtoolsAction) => {
    const list = utools?.db?.get('ReviewDbName')?.list || []
    const total = list?.length
    this.setState({
      total,
      list,
      action
    })
  }

  switchWordType = (wordType: string) => {
    this.setState({
      wordType
    })
  }

  render() {
    const { action, wordType } = this.state
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
