import { SetStateAction } from 'react';
import { SignupInput } from '../types';
export const SignupApi = (
  input: SignupInput,
  setToken: (data: SetStateAction<string>) => void,
) => {
  const baseUrl = 'http://localhost:3000'
  fetch( baseUrl + '/user/signup',
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
