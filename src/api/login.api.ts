import { LoginInput } from '../types';
import { baseUrl } from './constants';

export const LoginAPi = async (input: LoginInput) => { 
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
