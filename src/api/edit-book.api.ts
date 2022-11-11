import { BookInput, User } from '../types';
import { baseUrl } from './constants';
export const EditBookApi = async (input: BookInput,id: string, user: User) => {
  const url = baseUrl + '/books/edit/' + id 
  const response = await fetch(url,
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.access_token}`
    },
    body: JSON.stringify(input),
  })
  return await response.json();
};
