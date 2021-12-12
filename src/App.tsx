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
import { useEnterPluginHook } from './hooks/useEnterPlugin'


function NoMatch() {
  return <>路由未匹配</>
}

export default function App() {
  useEnterPluginHook()

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
