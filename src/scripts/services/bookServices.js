import { API_PATH } from '../constants/api-path';
import { request } from '../utils/request';

const bookApiPath = API_PATH.BOOKS;

export const addBookService = async (bookData) => {
	try {
		await request(bookApiPath, 'POST', bookData);
	} catch (error) {
		throw new Error(error);
	}
};

export const getBooksService = async (queryParams) => {
	try {
		const response = queryParams ? await request(`${bookApiPath}?${queryParams}`, 'GET') : await request(bookApiPath, 'GET');
		const totalBooks = response.totalCount;
		return { books: response.data, totalBooks };
	} catch (error) {
		throw new Error(error);
	}
};

export const getBookByIdService = async (bookId) => {
	try {
		const response = await request(`${bookApiPath}/${bookId}`, 'GET');
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

export const updateBookService = async (bookId, bookData) => {
	try {
		const response = await request(`${bookApiPath}/${bookId}`, 'PUT', bookData);
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

export const deleteBookService = async (bookId) => {
	try {
		await request(`${bookApiPath}/${bookId}`, 'DELETE');
	} catch (error) {
		throw new Error(error);
	}
};
