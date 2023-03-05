import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateShowSetting, updateshowNotification } from 'src/store/ui'
import {
  initialUtoolState,
  selectUtool,
  setUtoolSetting
} from 'src/store/utool'
import { addVocabularyAsync, fetchWordList, selectWord } from 'src/store/word'
import { PluginEnterAction } from 'src/types/common'

export const useEnterPluginHook = () => {
  const { reviewCount } = useSelector(selectWord)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWordList())
  }, [])


  const handlePluginAddWord = (action: PluginEnterAction) => {
    dispatch(
      addVocabularyAsync({
        text: action.payload,
        cb: () => {
            dispatch(fetchWordList())
        }
      })
    )
  }

  const handlePluginReview = () => {
    dispatch(fetchWordList())
  }
}
