import React from 'react'
import './index.less'

export const HomeHeader = (props:any) => {
  console.log(props)
  return (
    <div className="home-header-wrapper">
      <div className="icons">
        
      

        <div className="icon-desc">
          <span>
            <i className="iconfont icon-player iconHover" />
            <span className="desc">播放</span>
          </span>
          <span>
            <i className="iconfont icon-translate iconHover" />
            <span className="desc">翻译</span>
          </span>
          <span>
            <i className="iconfont icon-check iconHover" />
            <span className="desc">记得</span>
          </span>
          <span>
            <i className="iconfont icon-close iconHover" />
            <span className="desc">忘记</span>
          </span>
          <span>
            <i className="iconfont icon-delete iconHover" />
            <span className="desc">删除</span>
          </span>
        </div>

      </div>
    </div>
  )
}
