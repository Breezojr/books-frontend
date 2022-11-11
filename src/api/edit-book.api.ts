import { BookInput, User } from '../types';
export const EditBookApi = async (input: BookInput,id: string, user: User) => {
  const baseUrl = 'http://localhost:3000'

  const url = baseUrl + '/books/edit/' + id

  console.log(url)
 
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
