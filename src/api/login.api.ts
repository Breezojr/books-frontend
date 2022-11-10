import { SetStateAction } from 'react';
import { LoginInput } from '../types';
export const LoginApi = (
  input: LoginInput,
  setUser: (data: SetStateAction<any>) => void,
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
    .then((data) => setUser(data))
};
