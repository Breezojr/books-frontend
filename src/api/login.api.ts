import { SetStateAction } from 'react';
import { LoginInput } from '../types';
export const loginApi = (
  input: LoginInput,
  setToken: (data: SetStateAction<string>) => void,
) => {
  const baseUrl = 'http://localhost:3000'
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
