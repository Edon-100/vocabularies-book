import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateShowSetting } from 'src/store/ui'
import { initialUtoolState, selectUtool, setUtoolSetting } from 'src/store/utool'
import { addVocabularyAsync, fetchWordList, selectWord } from 'src/store/word'
import { PluginEnterAction } from 'src/types/common'

export const useEnterPluginHook = () => {
  const { reviewCount } = useSelector(selectWord)
  const dispatch = useDispatch()

  const utoolsSettingRef = useRef<UtoolState>()

  /* 根据打开plugin的方式，执行一些逻辑 */
  useEffect(() => {
    utools.onPluginEnter(async (action: PluginEnterAction) => {

			await initUtoolSetting()

      if (action.code === 'add vocabulary') {
        handlePluginAddWord(action)
      }

      if (action.code === 'review') {
        handlePluginReview()
      }
			
    })
  }, [reviewCount])

	const initUtoolSetting = () => {
    return new Promise((resolve) => {
      const setting = window.services.wordModel.getUtoolsSetting() || initialUtoolState
      dispatch(setUtoolSetting(setting)) // 同步到redux
      if (!setting) {
        window.services.wordModel.setUtoolsSetting(setting)
      }
      console.log('UtoolSetting', setting)
      utoolsSettingRef.current = setting
      resolve(setting)
    })
	}
	

  const handlePluginAddWord = (action: PluginEnterAction) => {
    const needclose = !!utoolsSettingRef.current?.closeAfterAddWord
    if (needclose) window.utools.hideMainWindow()
    dispatch(
      addVocabularyAsync({
        text: action.payload,
        cb: () => {
           if (needclose){
             window.utools.outPlugin()
           } else {
            dispatch(fetchWordList())
           }
        }
      })
    )
  }

  const handlePluginReview = () => {
    window.services.wordModel.minimizeDbSize()
    dispatch(fetchWordList())
  }
}
