import { User } from "../types";

export const DeleteApi = async (id: string, user: User) => {
  const baseUrl = 'http://localhost:3000'
 
  const response = await fetch(baseUrl + '/books/delete/' + id,
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.access_token}`
    },
  })
  return await response.json();
};
