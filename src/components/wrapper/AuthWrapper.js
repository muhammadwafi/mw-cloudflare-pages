import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

function AuthWrapper({ children }) {
  const { user, isAuthenticated } = useAuth();
  let location = useLocation();

  if (!isAuthenticated && !Object.keys(user).length) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    toast.error('You need to sign in first')
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default AuthWrapper