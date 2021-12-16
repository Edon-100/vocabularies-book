import Drawer from 'rc-drawer'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUi, updateShowDic } from 'src/store/ui'
import './index.less'

export const Dictionary = (props: { word: string }) => {
  const { showDic } = useSelector(selectUi)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const url = `https://dictionary.cambridge.org/zhs/%E8%AF%8D%E5%85%B8/%E8%8B%B1%E8%AF%AD-%E6%B1%89%E8%AF%AD-%E7%B9%81%E4%BD%93/${props.word}`

  const onChange = (bool: boolean) => {
    console.log('change', bool)
  }

  const onTouchEnd = (bool: boolean) => {
    dispatch(updateShowDic(false))
  }

  const onIframeLoaded = () => {
    console.log('onIframeLoaded')
    setLoading(false)
  }

  return (
    <Drawer
      onChange={(e) => onChange(e as any)}
      open={showDic}
      onClose={(e) => onTouchEnd(e as any)}
      placement="left"
      handler={false}
      level={null}
      afterVisibleChange={(c: boolean) => {
        console.log('transitionEnd: ', c)
      }}
      width="50vw"
    >
      <iframe onLoad={() => onIframeLoaded()} className={loading ? 'iframe-placeholder' : ''} src={url} style={{ width: '100%', height: '100%' }}><h2>loading...</h2></iframe>
    </Drawer>
  )
}
