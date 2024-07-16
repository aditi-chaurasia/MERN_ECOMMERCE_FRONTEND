import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from "react-helmet";


const Layout = ({children,title,decription,keywords,author}) => {
  return (
    <div>
        <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={decription} />
                 <meta name="keywords" content={keywords} />
                 <meta name="author" content={author} />
                

                <title>{title}</title>
            </Helmet>
        <Header/>
        <main style={{minHeight:'70vh'}}>{children}</main>
        
        <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title:"Trendy Cart",
  description:"mern stack project",
  keywors:"mern,react,node",
  author:"Aditi Chaurasia",

}

export default Layout