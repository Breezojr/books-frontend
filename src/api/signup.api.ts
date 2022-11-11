import { SignupInput } from '../types';
import { baseUrl } from './constants';

export const SignupAPi = async (input: SignupInput) => { 
  const response = await fetch(baseUrl + '/user/signup',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
  return await response.json();
};
