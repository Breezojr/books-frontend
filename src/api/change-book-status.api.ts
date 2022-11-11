import { User } from "../types";

export const StatusApi = async (id: string, user: User) => {
  const baseUrl = 'http://localhost:3000'
 
  const response = await fetch(baseUrl + '/books/deactivate/' + id,
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.access_token}`
    },
  })
  return await response.json();
};
