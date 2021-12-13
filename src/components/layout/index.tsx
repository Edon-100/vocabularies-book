import Drawer from 'rc-drawer'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { selectUi, updateShowSetting } from 'src/store/ui'
import { HomeDrawer } from '../HomeDrawer'
import { HomeFooter } from '../HomeFooter'
import { HomeHeader } from '../HomeHeader'

import './index.less'

export const Layout = (props: any) => {
  return (
    <div className="layout">
      <HomeDrawer />
      {/* <HomeHeader /> */}
      {/* <div>Header</div> */}
      {/* <Link to="/">Home</Link> */}
      <Outlet />
      <HomeFooter />
    </div>
  )
}
