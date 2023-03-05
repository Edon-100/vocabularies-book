import React from 'react'
import Drawer from 'rc-drawer'
import Switch from 'rc-switch'
import './index.less'
import { selectUi, updateshowNotification, updateShowSetting } from 'src/store/ui'
import { useDispatch, useSelector } from 'react-redux'
import { Divider } from '../Divider'
import { selectUtool, updateCloseAfterAddWord } from 'src/store/utool'

const listShortcuts = [
  { desc: '记得首个单词', shortcut: 'Shift + R' },
  { desc: '忘记首个单词', shortcut: 'Shift + F' },
  { desc: '首个单词发音', shortcut: 'Shift + P' },
  { desc: '翻译首个单词', shortcut: 'Shift + T' }
]

const cardShortcuts = [
  { desc: '下一个', shortcut: 'Shift + >' },
  { desc: '上一个', shortcut: 'Shift + <' },
  { desc: '单词发音', shortcut: 'Shift + P' },
  { desc: '模式切换', shortcut: 'Shift + M' },
  { desc: '开启/关闭翻译', shortcut: 'Shift + T' },
]

export const HomeDrawer = () => {
  const { showSetting } = useSelector(selectUi)
  const { closeAfterAddWord } = useSelector(selectUtool)
  const dispatch = useDispatch()

  const onChange = (bool: boolean) => {
    console.log('change', bool)
  }

  const onTouchEnd = (bool: boolean) => {
    dispatch(updateShowSetting(false))
  }

  const onCloseAfterAddSwitchChange = (value:boolean) => {
    dispatch(updateCloseAfterAddWord(value))
  }
  
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Drawer
        onChange={(e) => onChange(e as any)}
        open={showSetting}
        onClose={(e) => onTouchEnd(e as any)}
        placement="right"
        handler={false}
        level={null}
        afterVisibleChange={(c: boolean) => {
          console.log('transitionEnd: ', c)
        }}
        width="30vw"
      >
        {/* 设置模块 */}
        <h4 className="header">设置</h4>
        <div className="setting-item">
          <div className="content">加入单词后退出插件</div>
          <Switch
            checked={closeAfterAddWord}
            onChange={onCloseAfterAddSwitchChange}
            checkedChildren="开"
            unCheckedChildren="关"
          />
        </div>
        <Divider />
        {/* 设置模块 */}


        {/* 功能模块 */}
          {/* <h4 className="header">功能</h4>
          <div className="content">
            <div className="function-item">
              <div>导出</div>
              <div>导入</div>
            </div>
          </div>
          <Divider /> */}
        {/* 功能模块 */}


        {/* 快捷键模块 */}
        <h4 className="header">快捷键</h4>
        <div className="content">
          <h5 style={{ textAlign: 'center' }}>列表模式</h5>
          <div className="titles">
            <span className="title">功能说明</span>
            <span className="title">快捷键</span>
          </div>
          {listShortcuts.map((item, index) => {
            return (
              <div key={index} className="titles">
                <span className="shorcut-desc">{item.desc}</span>
                <span className="shorcut-desc">{item.shortcut}</span>
              </div>
            )
          })}

          <h5 style={{ textAlign: 'center' }}>卡片模式</h5>
          <div className="titles">
            <span className="title">功能说明</span>
            <span className="title">快捷键</span>
          </div>
          {cardShortcuts.map((item, index) => {
            return (
              <div key={index} className="titles">
                <span className="shorcut-desc">{item.desc}</span>
                <span className="shorcut-desc">{item.shortcut}</span>
              </div>
            )
          })}
        </div>

        <Divider />
        <h4 className="header">其他</h4>
        <div className="content">
         <div className="view-version-btn" onClick={() => dispatch(updateshowNotification(true))}>查看版本说明</div>
        </div>
        {/* 快捷键模块 */}
      </Drawer>
    </div>
  )
}
