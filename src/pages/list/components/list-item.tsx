import React, { useState, useRef, useEffect, memo } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { Dialog } from 'src/components/dialog'
import './list-item.less'
import { useKeySoudIns } from 'src/hooks/useSounds'
import { playWordPronunciation } from 'src/utils'
import { useDispatch } from 'react-redux'
import { fetchWordList, wordSlice } from 'src/store/word'
import axios from 'axios'
import { CardProps, IWord, TranslateItemProps } from 'src/types/Word'
import { deleteWord, updateWord } from 'src/api/base'

const TranslateItem = memo((props: TranslateItemProps) => {
  const { transalteText, index, handleItemChange } = props

  const editableRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<{ timmer: ReturnType<typeof setTimeout> }>({
    timmer: 0
  })

  const handleTranslateChange = (e: ContentEditableEvent) => {
    if (timerRef.current.timmer) clearTimeout(timerRef.current.timmer)
    timerRef.current.timmer = setTimeout(() => {
      handleItemChange(index, editableRef.current?.textContent || transalteText)
    }, 500)
  }

  return (
    <>
      <ContentEditable
        className="translate-editable"
        innerRef={editableRef}
        html={transalteText}
        onChange={handleTranslateChange}
      ></ContentEditable>
    </>
  )
})

const ListItem = function ({ word, showFirstWordTranslate }: CardProps) {
  const dispatch = useDispatch()
  let sentences: string[] = []
  const {updateWordList} = wordSlice.actions
  const [showTranslate, setShowTranslate] = useState(false)
  const [sentence, setSentence] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { playKeySound, playBeepSound, playSuccessSound } = useKeySoudIns
  

  useEffect(() => {
    ;(window as any).playBeepSound = playBeepSound
    ;(window as any).playKeySound = playKeySound
    ;(window as any).playSuccessSound = playSuccessSound
  }, [])

  useEffect(() => {
    setShowTranslate(!!showFirstWordTranslate)
  }, [showFirstWordTranslate])

  useEffect(() => {
    if (showTranslate && !sentence) {
      getEgSentence(word?.affix.text!)
    }
  }, [showTranslate])

  const hanleShowTranslate = () => {
    setShowTranslate((showTranslate) => !showTranslate)
  }

  const handleAudioPlay = () => {
    playWordPronunciation(word?.affix.text)
  }

  const handleDelete = async (word:IWord) => {
    console.log('删除')
    // TODO: deleteWrodObj(word?.affix.text)
    playBeepSound()
    deleteWord(word.id).then((res) => {
      dispatch(updateWordList(word))
    })
    // dispatch(fetchWordList())
    setShowDeleteDialog(false)
  }

  const handleLevelUp = (word:IWord) => {
    console.log('升级')
    playSuccessSound()
    // TODO: addWordToNextLevel(text)
    updateWord(word.id, {
      action: 'upgrade',
    }).then(res => {
      dispatch(updateWordList(word))
    })
    // dispatch(fetchWordList())
  }
  
  const handleback = (word:IWord) => {
    console.log('降级')
    playBeepSound()
    updateWord(word.id, {
      action: 'downgrade',
    }).then(res => {
      dispatch(updateWordList(word))
    })
    // TODO: addWordToPreviousLevel(text)
    // dispatch(fetchWordList())
  }

  const showDeleteModal = () => {
    setShowDeleteDialog(true)
  }

  const getEgSentence = async (text: string) => {
    const url = `https://apii.dict.cn/mini.php?q=${text}`
    const res = await axios(url)
    let html = res.data
    let reg = new RegExp(/<i>\d+<\/i>/, 'ig')
    let index = 0
    html.replace(reg, (...args: any) => {
      const iIndex = args[0]
      html = html.replace(iIndex, `${iIndex}${getPlayIcon(index)}`)
      index++
    })
    const title = html.match(/<div class="t">((?!<\/div)(.|\n))+<\/div>/) || {}
    const sentence = html.match(/<div id="s">((?!<\/div)(.|\n))+<\/div>/) || {}
    if (title[0] && sentence[0]) {
      let totalHtml = `${title[0]}${sentence[0]}`
      setSentence(totalHtml)
    }
  }

  const getPlayIcon = (index: number) => {
    return `<i class="iconfont icon-player iconHover" style="position:absolute;right:14px" data-index=${index}></i>`
  }

  const handleIconClick = (e: any) => {
    const ele = e.target
    if (ele.tagName === 'I') {
      const { index } = ele.dataset
      if (!sentences.length) {
        let tempArr = []
        const transalteSrapper = document.querySelector(
          `.sentence_wrapper.${word?.affix.text!}`
        )
        const textContent = transalteSrapper?.textContent
        console.log(textContent)
        textContent?.replace(
          /\d+\.\s([\w|\s\-%',，"“”]+)[\.\?\!\。\？\！]/ig,
          (...args) => {
            if (args[1]) {
              console.log('args', args[1])
              sentences.push(args[1])
            }
            return ''
          }
        )
      }
      console.log('获取句子', sentences && sentences[index])
      if (sentences.length) {
        playWordPronunciation(sentences[index])
      }
    }
  }

  const handleTranslateItemChange = (index: number, translateText: string) => {
    console.log('更新翻译内容，未实现')
    // const newExplains = [...word.explains]
    // newExplains[index] = translateText
    // TODO: updateWordTranslate(word.text, newExplains)
  }

  return (
    <div className="list-item">
      {showDeleteDialog && (
        <Dialog
          visible={showDeleteDialog}
          onOk={() => handleDelete(word)}
          onCancel={() => setShowDeleteDialog(false)}
        ></Dialog>
      )}
      <p className="word">
        {word?.affix.text}
        <span className="phonetic">
          {word?.affix.phonetic ? `[${word?.affix.phonetic}]` : ''}
        </span>
      </p>
      {/* <Tooltip overlay={`遗忘曲线等级: ${(word?.learn.level as number) + 1}`} overlayStyle={{ transform: 'scale(.8)' }} placement="top"> */}
      <div className="level">
        <i
          className={`iconfont icon-level-${(word?.forgettingCurveLevel as number) + 1}`}
        ></i>
        {/* &nbsp;{word?.learn.level} */}
      </div>
      {/* </Tooltip> */}
      {/* <div className="time">
        <i className="iconfont icon-time"></i>&nbsp;{dayjs(word?.learn.learnDate).format('YYYY-MM-DD hh:mm:ss')}
      </div> */}
      <div className="operate">
        <div>
          {/* <Tooltip overlay="播放" overlayStyle={{ transform: 'scale(.8)' }}> */}
          <i
            className="iconfont icon-player iconHover"
            onClick={handleAudioPlay}
          ></i>
          {/* </Tooltip> */}
          {/* <Tooltip
            placement="left"
            overlay="显示/隐藏 翻译"
            overlayStyle={{ transform: 'scale(.8)' }}
          > */}
          <i
            className="iconfont icon-translate iconHover"
            onClick={hanleShowTranslate}
          ></i>
          {/* </Tooltip> */}
        </div>
        <div>
          {/* <Tooltip
            placement="left"
            overlay="记得"
            overlayStyle={{ transform: 'scale(.8)' }}
          > */}
          <i
            className="iconfont icon-check iconHover"
            onClick={() => handleLevelUp(word)}
          ></i>
          {/* </Tooltip>
          <Tooltip
            placement="left"
            overlay="忘记"
            overlayStyle={{ transform: 'scale(.8)' }}
          > */}
          <i
            className="iconfont icon-close iconHover"
            onClick={() => handleback(word)}
          ></i>
          {/* </Tooltip> */}
          {/* <Tooltip
            placement="left"
            overlay="删除"
            overlayStyle={{ transform: 'scale(.8)' }}
          > */}
          <i
            className="iconfont icon-delete iconHover"
            onClick={showDeleteModal}
          ></i>
          {/* </Tooltip> */}
        </div>
      </div>
      {showTranslate && (
        <div>
          <div className="translation">
            {word?.affix.explains?.map((text, index) => (
              <TranslateItem
                key={text}
                index={index}
                transalteText={text}
                handleItemChange={handleTranslateItemChange}
              />
            ))}
          </div>
          <div
            className={`sentence_wrapper ${word?.affix.text!}`}
            dangerouslySetInnerHTML={{ __html: sentence }}
            onClick={handleIconClick}
          ></div>
          {/* {translateEditable ? (
            <i
              className="iconfont icon-check iconHover"
              onClick={() => {
                setTranslateEditable(false)
              }}
            />
          ) : (
            <i
              className="iconfont icon-edit iconHover"
              onClick={() => {
                setTranslateEditable(true)
              }}
            />
          )} */}
        </div>
      )}
    </div>
  )
}

export { ListItem }