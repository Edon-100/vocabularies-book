import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { HomeFooter } from '../HomeFooter'
import { HomeHeader } from '../HomeHeader'
import './index.less'

export const Layout = (props: any) => {
  let navigate = useNavigate()
  useEffect(() => {
    navigate('/list')
  }, [])
  return (
    <div className="layout">
      <HomeHeader />
      {/* <div>Header</div> */}
      {/* <Link to="/">Home</Link> */}
      <Outlet />
      <HomeFooter />
    </div>
  )
}
