import { PATH } from '../constants/base-url';

export const addBookService = (newBook) => request(PATH, 'post', newBook);

export const getBooksService = () => request(PATH, 'get');
