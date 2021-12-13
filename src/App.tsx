// @ts-ignor
import React, { useEffect } from 'react'
import {
  Route,
  RouteObject,
  Routes,
  useNavigate,
  Navigate,
  HashRouter
} from 'react-router-dom'
import './index.less'
import { useRoutes, BrowserRouter } from 'react-router-dom'
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
  // let navigate = useNavigate()
  // useEffect(() => {
  //   console.log('111')
  //   navigate('/home/list')
  // }, [])

  // let routes: RouteObject[] = [
  //   {
  //     path: '/',
  //     element: <Layout></Layout>,
  //     children: [
  //       // { index: true, element: <Home /> },
  //       {
  //         index: true,
  //         path: '/list',
  //         element: <WordList />
  //       },
  //       {
  //         path: '/typing',
  //         element: <WordCard />
  //       },
  //       { path: '*', element: <NoMatch /> }
  //     ]
  //   }
  // ]

  // let element = useRoutes(routes)

  // return <>{element}</>

  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Layout />}>
          <Route path="list" element={<WordList />} />
          <Route path="typing" element={<WordCard />} />
        </Route>
        <Route path="/" element={<Navigate replace to="/home/list" />} />
        <Route
          path="*"
          element={<NoMatch />}
        />
      </Routes>
    </HashRouter>
  )
}
