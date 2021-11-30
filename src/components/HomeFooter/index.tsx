import Tooltip from 'rc-tooltip'
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchWordList, selectWord } from 'src/store/word'
import {
  downloadJsonByContent,
  downloadTXTByContent,
  read_file
} from 'src/utils'
import './index.less'

export const HomeFooter = () => {
  const { reviewCount, doneCount, reviewList, allWordList, allWordCount } = useSelector(selectWord)

  const dispatch = useDispatch()

  const [showExport, setShowExport] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const uploadInput = useRef<HTMLInputElement>(null)

  const handleDownloadTXT = () => {
    const content = allWordList.reduce((total, cur) => {
      return (total += `${cur.text}\r\n`)
    }, '')
    downloadTXTByContent(content)
  }

  const handleDownloadJson = () => {
    const data = JSON.stringify({ list: allWordList })
    downloadJsonByContent(data)
  }

  const loadFile = (e: any) => {
    e.stopPropagation()
    uploadInput.current?.click()
  }

  /**
   * @description 把json文件导入到db中
   * @param {*} e
   */
  const handleFileChange = async (e: any) => {
    const file: File = e.target.files[0]
    try {
      const fileResult = await read_file(file)
      const data = JSON.parse(fileResult)
      if (data.list && data.list[0]?.text) {
        debugger
        window.services.wordModel.importWordList(data.list)
        dispatch(fetchWordList())
      } else {
        alert('导入失败，请检查数据格式')
      }
    } catch (error) {
      console.log('3333', error)
      alert('导入失败，请检查数据格式')
    }
  }

  return (
    <>
      {showExport && (
        <div className="export-confirm-modal">
          <div
            className="close"
            onClick={() => {
              setShowExport(false)
            }}
          >
            X
          </div>
          <div className="export-group">
            <div className="export-item" onClick={handleDownloadTXT}>
              导出txt
            </div>
            <div className="export-item" onClick={handleDownloadJson}>
              导出Json
            </div>
          </div>
        </div>
      )}
      {showImport && (
        <div className="export-confirm-modal">
          <div
            className="close"
            onClick={() => {
              setShowImport(false)
            }}
          >
            X
          </div>
        </div>
      )}
      <input
        ref={uploadInput}
        accept=".json"
        type="file"
        className="local-file-input"
        onChange={handleFileChange}
      />

      <div className="home_footer">
        <div>
          <span>单词总数: {allWordCount}</span>
          <span>待复习: {reviewCount}</span>
          <span>已记完: {doneCount}</span>
        </div>
        <div>
          {/* <div onClick={this.handleDownload}>导出</div> */}
          <Tooltip
            overlay="导入"
            overlayStyle={{ transform: 'scale(.8)' }}
            placement="top"
          >
            <i onClick={loadFile} className="iconfont icon-import" />
          </Tooltip>
          <Tooltip
            overlay="导出"
            overlayStyle={{ transform: 'scale(.8)' }}
            placement="top"
          >
            <i
              onClick={() => {
                allWordCount && setShowExport(true)
              }}
              className={`iconfont icon-export ${
                !allWordCount ? 'active' : ''
              }`}
            />
          </Tooltip>
          {/* <Tooltip
                overlay="单词本"
                overlayStyle={{ transform: 'scale(.8)' }}
                placement="top"
              >
                <i
                  onClick={() => this.switchWordType('notebook')}
                  className={`iconfont icon-notebook-1 ${
                    wordType === 'notebook' ? 'active' : ''
                  }`}                  
                />
              </Tooltip> */}
          <Tooltip
            overlay="列表模式"
            overlayStyle={{ transform: 'scale(.8)' }}
            placement="top"
          >
            {/* <i
              onClick={() => switchWordType('list')}
              className={`iconfont icon-list ${
                wordType === 'list' ? 'active' : ''
              }`}
            /> */}
            <Link to="/list" style={{marginLeft: '16px'}}>
              <i
                className={`iconfont icon-list`}
              // <i
              //   className={`iconfont icon-list ${
              //     wordType === 'list' ? 'active' : ''
              //   }`}
              />
            </Link>
          </Tooltip>
          <Tooltip
            overlay="听写模式"
            overlayStyle={{ transform: 'scale(.8)' }}
            placement="top"
          >
            {/* <i
              onClick={() => {
                allWordsNumber && switchWordType('card')
              }}
              className={`iconfont icon-card ${
                wordType === 'card' || !allWordsNumber ? 'active' : ''
              }`}
            /> */}
            <Link to="/typing" style={{marginLeft: '16px'}}>
              {/* <i
                className={`iconfont icon-card ${
                  wordType === 'card' || !allWordCount ? 'active' : ''
                }`} */}
              <i
                className={`iconfont icon-card`}
              />
            </Link>
          </Tooltip>
        </div>
      </div>
    </>
  )
}
