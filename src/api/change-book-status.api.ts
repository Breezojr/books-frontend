import { SetStateAction } from 'react';
import { Book } from '../types';
export const getAllBooks = (
  setBooks: (data: SetStateAction<Book[]>) => void,
) => {
  const baseUrl = 'http://localhost:3000'
  fetch( baseUrl + '/books')
    .then((response) => response.json())
    .then((data) => setBooks((data) ))
};

