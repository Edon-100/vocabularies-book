import React from 'react'
import './index.less'

export const HomeHeader = (props: any) => {
  return (
    <div className="home-header-wrapper">
      <div className="icons">
        <div className="icon-desc">
          Tips:
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

          <span className="shortcut_tips">Shift + [R/F]【记得/忘记】第一个单词</span>
          <span className="shortcut_tips">Shift + P 播放第一个单词发音</span>
          <span className="shortcut_tips">Shift + T 翻译第一个单词</span>
        </div>
      </div>
    </div>
  )
}
