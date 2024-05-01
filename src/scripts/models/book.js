import {
	addBookService,
	getBooksService,
	deleteBookService,
	editBookService,
	getBookByIdService,
	getImageUrlServices
} from '../services/bookServices';

export default class BookModel {
	addBook = async (bookData) => {
		const response = await addBookService(bookData);
		return response;
	};

	getBooks = async () => {
		const response = await getBooksService();
		return response;
	};

	getBookById = async (bookId) => {
		const response = await getBookByIdService(bookId);
		return response;
	};

	editBook = async (bookId, bookData) => {
		await editBookService(bookId, bookData);
	};

	deleteBook = async (bookId) => {
		await deleteBookService(bookId);
	};

	getImageUrl = async (fileUpload) => {
		const response = await getImageUrlServices(fileUpload);
		return response;
	};
}
