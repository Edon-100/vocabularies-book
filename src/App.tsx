// @ts-ignore
import React, { useEffect } from 'react'
import type { RouteObject } from 'react-router-dom'
import './index.less'
import { useRoutes } from 'react-router-dom'
import { WordList } from './pages/list'
import WordCard from './pages/card'
import { Layout } from './components/layout'
import { useDispatch, useSelector } from 'react-redux'
import { addVocabularyAsync, fetchWordList, selectWord } from './store/word'

function NoMatch() {
  return <>路由未匹配</>
}

export default function App() {
  const { reviewCount } = useSelector(selectWord)
  const dispatch = useDispatch()

  /* 根据打开plugin的方式，执行一些逻辑 */
  useEffect(() => {
    utools.onPluginEnter(async (action) => {
      if (action.code === 'add vocabulary') {
        const adreadyOpenPlugin = !!reviewCount
        alert(adreadyOpenPlugin)
        if (!adreadyOpenPlugin) window.utools.hideMainWindow()
        dispatch(
          addVocabularyAsync({
            text: action.payload,
            cb: () => {
              if (adreadyOpenPlugin) {
                dispatch(fetchWordList())
              } else {
                window.utools.outPlugin()
              }
            }
          })
        )
      }
      if (action.code === 'review') {
        window.services.wordModel.minimizeDbSize()
        dispatch(fetchWordList())
      }
    })
  }, [reviewCount])

  let routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout></Layout>,
      children: [
        // { index: true, element: <Home /> },
        {
          index: true,
          path: '/list',
          element: <WordList />
        },
        {
          path: '/typing',
          element: <WordCard />
        },
        { path: '*', element: <NoMatch /> }
      ]
    }
  ]

  let element = useRoutes(routes)

  return <>{element}</>
}
