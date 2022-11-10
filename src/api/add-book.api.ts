import { SetStateAction } from 'react';
import { BookInput } from '../types';
export const AddBookApi = (
  input: BookInput,
  setToken: (data: SetStateAction<string>) => void,
) => {
  const baseUrl = 'http://localhost:3000'
  fetch( baseUrl + '/books/add',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then((response) => response.json())
    .then((data) => setToken((data) ))
};
