import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../app/slices/authSlice';

const PrivateRoute = ({ element, allowed }) => {

  const user = useSelector(selectCurrentUser)
  // console.log('user', user)
  
  if (!!user && !allowed.includes(user.role)) {
    return window.history.back();
  }
  // if (!user) {
  //   window.location.href = '/'
  // }


  return element;
};

export default PrivateRoute;