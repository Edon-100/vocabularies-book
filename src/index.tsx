import React from 'react'
import { render } from 'react-dom'
import './index.less'
import 'src/assets/icons/iconfont.css'
import 'rc-tooltip/assets/bootstrap.css'
import 'rc-drawer/assets/index.css'
import 'rc-switch/assets/index.css'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

const root = document.getElementById('root')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)
