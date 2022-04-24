import React, { useContext, useState } from 'react';

export interface AuthState {
  username?: string;
  setUsername?: (username: string) => void;
  token?: string;
  setToken?: (token: string) => void;
  avatar?: string;
  setAvatar?: (avatar: string) => void;
  removeUserInfo?: () => void;
}

export interface AuthProviderProps extends AuthState {
  children: React.ReactElement;
}

const initialState: AuthState = {
  username: '',
  token: '',
  avatar: '',
};

const AuthStateContext = React.createContext<AuthState>(initialState);

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [avatar, setAvatar] = useState('');
  const removeUserInfo = () => {
      setUsername('');
      setToken('');
      setAvatar('');
  }
  return (
    <AuthStateContext.Provider
      value={{ username, setUsername, token, setToken, avatar, setAvatar, removeUserInfo }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

export function useAuth(): AuthState {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error(
      'useAuth must be inside a AuthStateContext with a state value'
    );
  }
  return context;
}
