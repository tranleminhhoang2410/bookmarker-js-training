import { API_PATH } from '../constants';
import { request } from '../utils';

//Book API
const appApiUrl = process.env.BASE_API_URL;
const bookApiPath = API_PATH.BOOKS;
const bookApiUrl = appApiUrl + bookApiPath;

//Upload image API
const uploadImageUrl = process.env.IMG_UPLOAD_URL + 'key=' + process.env.IMG_UPLOAD_KEY;

export const getImageUrlServices = async (formData) => {
	try {
		const response = await request(uploadImageUrl, 'POST', formData, false); // Notice the `false` here
		if (response.data && response.data.url) {
			return response.data.url;
		} else {
			throw new Error('Image URL not found in response');
		}
	} catch (error) {
		throw new Error(error);
	}
};
export const addBookService = async (bookData) => {
	try {
		const response = await request(bookApiUrl, 'POST', bookData);
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

export const getBooksService = async () => {
	try {
		const response = await request(bookApiUrl, 'GET');
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

export const getBookByIdService = async (bookId) => {
	try {
		const response = await request(`${bookApiUrl}/${bookId}`, 'GET');
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

export const editBookService = async (bookId, bookData) => {
	try {
		const response = await request(`${bookApiUrl}/${bookId}`, 'PUT', bookData);
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

export const deleteBookService = async (bookId) => {
	try {
		await request(`${bookApiUrl}/${bookId}`, 'DELETE');
	} catch (error) {
		throw new Error(error);
	}
};
