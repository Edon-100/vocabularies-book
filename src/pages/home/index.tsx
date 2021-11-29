// @ts-ignore
import React from 'react'
import WordList from '../list'
import WordCard from '../card'
import NoteBook from '../notebook'
import { HomeFooter } from '../../components/HomeFooter'
import './index.less'
import ErrorBoundary from '../../components/ErrorBoundaries'
// import { mock } from './mock' // TODO: 上线前删除掉
import { HomeHeader } from '../../components/HomeHeader'
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";


export default class Home extends React.Component<any, HomeState> {
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
    showExport: false, // ui
    showImport: false, // ui
    action: {
      code: '',
      type: '',
      payload: {},
      optional: []
    } as UtoolsAction
  } as HomeState

  componentDidMount() {
    utools.onPluginEnter(async (action) => {
      if (action.code === 'add vocabulary') {
        window.services.wordModel.addVocabulary(action.payload).then(() => {
          if (!this.state.total) {
            window.utools.outPlugin()
          } else {
            this.updateWordsListToState()
          }
        })
        if (!this.state.total) {
          window.utools.hideMainWindow()
        }
      }

      if (action.code === 'review') {
        window.services.wordModel.minimizeDbSize() // 以前的数据太大，所以需要优化一下
        this.updateWordsListToState()
        this.setState({
          total: this.state.total,
          allWords: this.state.allWords,
          list: this.state.list,
          allWordsNumber: this.state.allWordsNumber
        })
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
          HOME
          {/* <div className="home_header">
            {!!this.state.list.length && wordType === 'list' && <HomeHeader />}
          </div> */}
          <div className="home_body">
            {/* {!this.state.list.length && this.state.wordType !== 'card' && (
              <div className="no_words_tips">暂无需要复习的单词</div>
            )} */}
            <Outlet />
            {/* {wordType === 'list' && !!this.state.list.length && (
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
            )} */}
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
