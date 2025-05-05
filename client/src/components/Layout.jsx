import React from 'react'
import Navbarpage from './Navbarpage'
import Footerpage from './Footerpage'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
// import Homepage from '../pages/Homepage'
import {Toaster} from 'sonner'
const Layout = ({description,title,author,keywords}) => {
  return (
    <div>
        <Helmet>
        
  <meta charSet="UTF-8" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords}/>
  <meta name="author" content={author}/>


        </Helmet>
        <Navbarpage/>
        <div className="min-h-[65vh]" >
            <Outlet/>

        </div>

        <Footerpage/>
        <Toaster position="top-right" richColors/>
    </div>
  )
}
Layout.defaultProps={
title:"Authentication",
description:"Authentication APP",
keywords:"React",
author:"info",
}

export default Layout