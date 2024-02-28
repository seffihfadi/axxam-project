import { Outlet } from "react-router-dom"
import Footer from './Footer'
import Header from './Header'
import { Suspense } from "react"
import Loader from "./Loader"
import AlertModel from "./AlertModel"

const Layout = () => {
  return (

    <>
      <Header />
      <AlertModel />
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