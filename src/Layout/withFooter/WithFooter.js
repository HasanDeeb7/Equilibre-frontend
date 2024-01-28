import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
const WithFooter = () => {
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default WithFooter
