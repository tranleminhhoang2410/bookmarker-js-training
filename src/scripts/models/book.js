import {
	addBookService,
	getBooksService,
	deleteBookService,
	updateBookService,
	getBookByIdService,
	getImageUrlServices
} from '../services/bookServices';

export default class BookModel {
	addBook = async (bookData) => {
		await addBookService(bookData);
	};

	getBooks = async () => {
		const response = await getBooksService();
		return response;
	};

	getBookById = async (bookId) => {
		const response = await getBookByIdService(bookId);
		return response;
	};

	updateBook = async (bookId, bookData) => {
		await updateBookService(bookId, bookData);
	};

	deleteBook = async (bookId) => {
		await deleteBookService(bookId);
	};

	getImageUrl = async (fileUpload) => {
		const response = await getImageUrlServices(fileUpload);
		return response;
	};
}
