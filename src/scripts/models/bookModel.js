import { addBookService, getBooksService, deleteBookService, updateBookService } from '../services/bookServices';

export default class BookModel {
	constructor() {
		this.books = [];
	}

	addBook = async (bookData) => await addBookService(bookData);

	getBooks = async () => {
		const response = await getBooksService();
		return response;
	};

	bindFoodListChanged(callback) {
		this.onFoodListChanged = callback;
	}

	updateBook = async (bookId, bookData) => await updateBookService(bookId, bookData);

	deleteBook = async (bookId) => await deleteBookService(bookId);
}
