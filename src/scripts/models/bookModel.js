import { addBookService, getBooksService, deleteBookService, updateBookService } from '../services/bookServices';

export default class BookModel {
	constructor() {
		this.books = [];
	}

	addBook = async (bookData) => await addBookService(bookData);

	getBooks = async (currentPage = 1, itemPerPage = 6) => {
		const queryParams = new URLSearchParams({ _page: currentPage, _limit: itemPerPage });
		const response = await getBooksService(queryParams);
		const books = await response.books;
		const totalBooks = response.totalBooks;
		return { books, totalBooks };
	};

	updateBook = async (bookId, bookData) => await updateBookService(bookId, bookData);

	deleteBook = async (bookId) => await deleteBookService(bookId);
}
