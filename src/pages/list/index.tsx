import React from 'react'
import Card from './components/list-item'
import { useKeySoudIns } from 'src/hooks/useSounds'
import { playWordPronunciation } from 'src/utils'
import './index.less'
const KeyR = 82
const KeyF = 70
const KeyP = 80
const KeyT = 84

const { playBeepSound, playSuccessSound } = useKeySoudIns

class WordList extends React.Component<WordProps> {
  state = {
    showFirstWordTranslate: false
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyEvent)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyEvent)
  }

  keyEvent = (e: any) => {
    if (!this.props.list.length) return
    if (e.keyCode === KeyR && e.shiftKey) {
      playSuccessSound()
      window.services.wordModel.addWordToNextLevel(this.props.list[0].text)
      this.props.updateList!()
      this.setState({ showFirstWordTranslate: false })
    }
    if (e.keyCode === KeyF && e.shiftKey) {
      playBeepSound()
      window.services.wordModel.addWordToPreviousLevel(this.props.list[0].text)
      this.setState({ showFirstWordTranslate: false })
      this.props.updateList!()
    }
    if (e.keyCode === KeyP && e.shiftKey) {
      playWordPronunciation(this.props.list[0].text)
    }
    if (e.keyCode === KeyT && e.shiftKey) {
      console.log('true');
      this.setState({ showFirstWordTranslate: !this.state.showFirstWordTranslate })
    }
  }

  render() {
    const { list, total, updateList = () => {} } = this.props
    return (
      <div className="words-cards-wrapper">
        {!!list.length &&
          list.map((item: Word ,index) => (
            <Card word={item} updateList={updateList} key={item.text} showFirstWordTranslate={index === 0 && this.state.showFirstWordTranslate}></Card>
          ))}
      </div>
    )
  }
}

export default WordList
