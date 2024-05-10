import { Navigate, useLocation } from 'react-router-dom'
import { useGetUserQuery } from '../../features/auth/authApiSlice';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../app/slices/authSlice';
import Loader from './Loader';
import { useEffect } from 'react';
import { selectCurrentUser } from '../../app/slices/authSlice';

const PrivateRoute = ({ element, allowed }) => {

  const user = useSelector(selectCurrentUser)

  if (!!user && !allowed.includes(user.role)) {
    return window.history.back();
  }

  return element;
};

export default PrivateRoute;
