import { User } from "../types";
import { baseUrl } from "./constants";

export const DeleteApi = async (id: string, user: User) => { 
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
