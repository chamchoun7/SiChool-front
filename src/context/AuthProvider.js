import { useState, createContext } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [value, setValue] = useState({ apiLink: 'http://e2r11p4.1337.ma:8080/' });
  if (localStorage.getItem('_auth_data') && typeof value.token === 'undefined') {
    setValue(JSON.parse(localStorage.getItem('_auth_data')));
  }
  return <AuthContext.Provider value={[value, setValue]}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
