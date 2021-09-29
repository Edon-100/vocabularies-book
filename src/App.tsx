// @ts-ignore
import React from 'react'
import WordList from './pages/list'
import WordCard from './pages/card'
import NoteBook from './pages/notebook'
import { HomeFooter } from './components/HomeFooter'
import './index.less'
import ErrorBoundary from './components/ErrorBoundaries'
// import { mock } from './mock' // TODO: 上线前删除掉
import { HomeHeader } from './components/HomeHeader'
export default class App extends React.Component<any, HomeState> {
  constructor(props: any) {
    super(props)
  }

  state = {
    total: 0,
    allWordsNumber: 0,
    doneTotal: 0,
    list: [],
    allWords: [],
    wordType: 'list',
    showExport: false,
    showImport: false,
    action: {
      code: '',
      type: '',
      payload: {},
      optional: []
    } as UtoolsAction
  } as HomeState

  componentDidMount() {
    utools.onPluginEnter((action) => {
      if (action.code === 'add_vocabulary') {
        window.services.wordModel.addVocabulary(action.payload).then((word) => {
          this.updateWordsListToState()
        })
      } else {
        console.log('else review', action);
        this.updateWordsListToState()
      }
    })

    /* mock */
    // this.updateWordsListToState()
  }

  updateWordsListToState = () => {
    const {
      allWords,
      needLearnWords: list,
      doneList
    } = window.services.wordModel.getAllAndNeedList()
    const total = list?.length
    const allWordsNumber = allWords?.length
    this.setState({
      total,
      allWords,
      list,
      // list: allWords,
      allWordsNumber,
      doneTotal: doneList.length
    })

    /* mock */
    // const list = mock.list
    // const total = list?.length
    // const allWordsNumber = this.setState({
    //   // @ts-ignore
    //   allWords: list,
    //   total,
    //   allWordsNumber: total,
    //   // @ts-ignore
    //   list,
    //   doneTotal: 99
    // })
  }
  switchWordType = (type: 'list' | 'card' | 'notebook') => {
    if (this.state.wordType === type) return
    this.updateWordsListToState()
    this.setState({
      wordType: type
    })
  }

  render() {
    const { wordType } = this.state
    return (
      <ErrorBoundary>
        <div className="home">
          <div className="home_header">
            {!!this.state.list.length && <HomeHeader />}
          </div>
          <div className="home_body">
            {!this.state.list.length && this.state.wordType !== 'card' && (
              <div className="no_words_tips">暂无需要复习的单词</div>
            )}
            {wordType === 'list' && (
              <WordList
                list={this.state.list}
                total={this.state.total}
                updateList={this.updateWordsListToState}
              />
            )}
            {wordType === 'card' && (
              <WordCard
                allWords={this.state.allWords}
                list={this.state.list}
                total={this.state.total}
                updateList={this.updateWordsListToState}
              />
            )}
            {wordType === 'notebook' && (
              <NoteBook allWords={this.state.allWords}></NoteBook>
            )}
          </div>
          <HomeFooter
            allWords={this.state.allWords}
            allWordsNumber={this.state.allWordsNumber}
            total={this.state.total}
            doneTotal={this.state.doneTotal}
            wordType={this.state.wordType}
            switchWordType={this.switchWordType}
            updateWordsListToState={this.updateWordsListToState}
          />
        </div>
      </ErrorBoundary>
    )
  }
}
