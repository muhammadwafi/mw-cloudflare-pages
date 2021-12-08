import React from 'react'
import createPersistedState from 'use-persisted-state';

// Simulate authentication using persisted state
const useUserState = createPersistedState('user-data');
const useAuthState = createPersistedState('authenticated');

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useUserState({});
  const [isAuthenticated, setAuthenticated] = useAuthState(false);

  const setUserAuth = (data) => {
    if (!Object.keys(user).length && !isAuthenticated) {
      setUser(data);
      setAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setAuthenticated, setUserAuth }}> 
      { children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider
}