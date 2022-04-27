import { useState } from 'react';
import { LOCAL_STORAGE } from '../constants';
interface UserProps {
  username: string;
  avatar: string;
}

export const useCurrentUser = () => {
  const getCurrentUser = () => {
    const currentUser = localStorage.getItem(LOCAL_STORAGE.USER);
    return currentUser && JSON.parse(currentUser);
  };

  const [user, setUser] = useState(getCurrentUser());

  const saveUser = ({ username, avatar }: UserProps) => {
    localStorage.setItem(
      LOCAL_STORAGE.USER,
      JSON.stringify({ username, avatar })
    );
    setUser(user);
  };

  const removeUser = () => {
    localStorage.removeItem(LOCAL_STORAGE.USER);
    setUser(null);
  };

  return {user, setUser: saveUser, removeUser};
};
