import { useState } from 'react';
import { LOCAL_STORAGE } from '../constants';
export const useToken = () => {
  const getToken = () => {
    const jwtToken = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    return jwtToken && jwtToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (jwtToken: string) => {
    localStorage.setItem(LOCAL_STORAGE.TOKEN, jwtToken);
    setToken(jwtToken);
  };

  const removeToken = () => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    setToken(null);
  };

  return { setToken: saveToken, token, removeToken };
};