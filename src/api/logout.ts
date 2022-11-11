import { SetStateAction } from 'react';
import { LoginInput } from '../types';
import { baseUrl } from './constants';
export const LoginApi = (
  input: LoginInput,
  setToken: (data: SetStateAction<string>) => void,
) => {
  fetch( baseUrl + '/auth/login',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then((response) => response.json())
    .then((data) => setToken((data) ))
};
