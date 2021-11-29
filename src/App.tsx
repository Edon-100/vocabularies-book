// @ts-ignore
import React from 'react'
import type { RouteObject } from "react-router-dom";
import './index.less'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  Outlet,
  Link,
  useParams
} from 'react-router-dom'
import WordList from './pages/list'
import WordCard from './pages/card'
import Home from './pages/home'

function NoMatch() {
  return (
    <>
    </>
  )
}


export default function App() {
  let routes = [
    {
      path: '/',
      element: <Home />,
      children: [
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

  return (
    <div>
      {element}
    </div>
  )
}