import { BookInput, User } from '../types';
import { UserContext } from '../providers/UserProvider';
import { useContext } from 'react';

export const AddBookApi = async (input: BookInput, user:User) => {
  const baseUrl = 'http://localhost:3000'
 
  const response = await fetch(baseUrl + '/books/add',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.access_token}`
    },
    body: JSON.stringify(input),
  })
  return await response.json();
};
