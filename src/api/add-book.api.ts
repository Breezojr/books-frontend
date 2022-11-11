import { BookInput, User } from '../types';
import { baseUrl } from './constants';
export const AddBookApi = async (input: BookInput, user:User) => {
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
