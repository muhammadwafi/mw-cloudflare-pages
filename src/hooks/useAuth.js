import React from 'react';
import { AuthContext } from '../context/authContext';


function useAuth() {
  return React.useContext(AuthContext);
}

export default useAuth;
