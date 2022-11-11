import { LoginInput } from '../types';

export const LoginAPi = async (input: LoginInput) => {
  const baseUrl = 'http://localhost:3000'
 
  const response = await fetch(baseUrl + '/auth/login',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
  return await response.json();
};
