import { SignupInput } from '../types';

export const SignupAPi = async (input: SignupInput) => {
  const baseUrl = 'http://localhost:3000'
 
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
