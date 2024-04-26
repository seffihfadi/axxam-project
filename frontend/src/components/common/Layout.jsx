import { Outlet, Navigate } from "react-router-dom"
import Footer from './Footer'
import Header from './Header'
import { Suspense, useEffect } from "react"
import Loader from "./Loader"
import AlertModel from "./AlertModel"
import { selectCurrentUser } from "../../app/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserQuery } from "../../features/auth/authApiSlice"
import { setUser } from "../../app/slices/authSlice"

const Layout = () => {
  const dispatch = useDispatch()
  const {data, isLoading} = useGetUserQuery()
  
  console.log('data layout', data)

  useEffect(() => {
    if (!!data) {
      const user = data.user;
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
  }, [data, dispatch]);

  if(isLoading) return <Loader />
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