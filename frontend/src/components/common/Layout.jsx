import { Outlet } from "react-router-dom"
import Footer from './Footer'
import Header from './Header'
import { Suspense } from "react"
import Loader from "./Loader"

const Layout = () => {
  return (

    <>
      <Header />
      <main>
        <div className="container">
          <Suspense fallback={<Loader msg='waiting' />}>
            <Outlet />  
          </Suspense>
        </div>
      </main>
      <Footer />
    </>

  )
}


export default Layout