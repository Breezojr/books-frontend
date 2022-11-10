import React, { createContext } from 'react';
import { User } from '../types';

interface StateType {
  user: User | null;
}

interface UserAction {
  type: string;
  user: User | null;
}

const userFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const initialState: StateType = {
  user: userFromLocalStorage(),
};

const actions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const reducer = (state: StateType, action: UserAction) => {
  switch (action.type) {
    case actions.LOGIN:
      localStorage.setItem('user', JSON.stringify(action.user));
      return {
        user: action.user,
      };
    case actions.LOGOUT:
      localStorage.removeItem('user');
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const UserContext = createContext({
  user: userFromLocalStorage(),
  login: () => {},
  logout: () => {},
} as { user: User | null; login: (user: User) => void; logout: () => void });

const UserProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    user: state.user,
    login: (user: User) => {
      dispatch({ type: actions.LOGIN, user: user });
    },
    logout: () => {
      dispatch({ type: actions.LOGOUT, user: null });
    },
  };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export { UserProvider };
