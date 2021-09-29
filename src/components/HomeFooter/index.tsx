import Tooltip from 'rc-tooltip'
import React from 'react'
import './index.less'

export const HomeFooter = (props: IHomeFooter) => {
  const {
		allWordsNumber,
		total,
		doneTotal,
		wordType,
		switchWordType,
		updateShowExport,
		loadFile
	} = props
  console.log(props)
  return (
    <div className="home_footer">
      <div>
        <span>单词总数: {allWordsNumber}</span>
        <span>待复习: {total}</span>
        <span>已记完: {doneTotal}</span>
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
              allWordsNumber && updateShowExport(true)
            }}
            className={`iconfont icon-export ${
              !allWordsNumber ? 'active' : ''
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
          <i
            onClick={() => switchWordType('list')}
            className={`iconfont icon-list ${
              wordType === 'list' ? 'active' : ''
            }`}
          />
        </Tooltip>
        <Tooltip
          overlay="听写模式"
          overlayStyle={{ transform: 'scale(.8)' }}
          placement="top"
        >
          <i
            onClick={() => {
              allWordsNumber && switchWordType('card')
            }}
            className={`iconfont icon-card ${
              wordType === 'card' || !allWordsNumber ? 'active' : ''
            }`}
          />
        </Tooltip>
      </div>
    </div>
  )
}
