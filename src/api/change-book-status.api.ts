import { User } from "../types";
import { baseUrl } from "./constants";

export const StatusApi = async (id: string, user: User) => { 
  const response = await fetch(baseUrl + '/books/deactivate/' + id,
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user?.access_token}`
    },
  })
  return await response.json();
};
