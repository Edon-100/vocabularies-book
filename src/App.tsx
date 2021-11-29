// @ts-ignore
import React from 'react'
import type { RouteObject } from 'react-router-dom'
import './index.less'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Outlet,
  Link,
  useParams,
  Navigate
} from 'react-router-dom'
import WordList from './pages/list'
import WordCard from './pages/card'
import Home from './pages/home'
import { HomePage } from './pages/home/indexNew'
import { Layout } from './components/layout'

function NoMatch() {
  return <>没有匹配到</>
}

export default function App() {
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
