// @ts-ignore
import React, { useEffect } from 'react'
import type { RouteObject } from 'react-router-dom'
import './index.less'
import { useRoutes } from 'react-router-dom'
import WordList from './pages/list'
import WordCard from './pages/card'
import { Home } from './pages/home'
import { HomePage } from './pages/home/indexNew'
import { Layout } from './components/layout'
import { useDispatch } from 'react-redux'
import { addVocabularyAsync, fetchWordList } from './store/word'

function NoMatch() {
  return <>没有匹配到</>
}

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    utools.onPluginEnter(async (action) => {
      if (action.code === 'add vocabulary') {
        dispatch(addVocabularyAsync(action.payload))
      }
      if (action.code === 'review') {
        dispatch(fetchWordList())
      }
    })
  }, [])
  let routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Home /> },
        {
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

  return <div>{element}</div>
}
