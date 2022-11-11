import { SetStateAction } from 'react';
import { Book } from '../types';
import { baseUrl } from './constants';
export const getAllBooks = (
  setBooks: (data: SetStateAction<Book[]>) => void,
) => {
  fetch( baseUrl + '/books')
    .then((response) => response.json())
    .then((data) => setBooks((data) ))
};

