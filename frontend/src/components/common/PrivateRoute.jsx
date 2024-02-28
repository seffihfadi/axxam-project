import { Navigate } from 'react-router-dom'
// import { useGetUserQuery } from '../features/auth/authApiSlice';

import { useDispatch } from 'react-redux';
// import { setUser } from '../features/auth/authSlice';
// import Loader from './Loader';

const PrivateRoute = ({ element, allowed }) => {
  // const dispatch = useDispatch()
  // const {data, isLoading} = useGetUserQuery()

  // if(isLoading) return <Loader />
  // console.log('data', data)

  // if (!data) {
  //   return <Navigate to="/signin" />;
  // }

  // const user = data?.user
  // dispatch(setUser(user))

  const user = {
    fullname: 'seffih fadi',
    role: 'Lessor',
    phone: '0560475728'
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (!allowed.includes(user.role)) {
    return window.history.back();
    // return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default PrivateRoute;
