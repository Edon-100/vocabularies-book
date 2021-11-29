import React, {useEffect} from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export const Layout = (props: any) => {
	let navigate = useNavigate();
	useEffect(() => {
		navigate('/')
	}, [])
  return (
    <>
      <div>Header</div>
			{/* <Link to="/">Home</Link> */}
			<Outlet />
      <div>Footer</div>
    </>
  )
}
