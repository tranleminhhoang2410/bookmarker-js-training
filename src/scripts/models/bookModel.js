import { addBookService, getBooksService, deleteBookService, updateBookService } from '../services/bookServices';

export default class BookModel {
	async addBook(bookData) {
		await addBookService(bookData);
	}

	async getBooks(currentPage = 1, itemPerPage = 6) {
		const queryParams = new URLSearchParams({ _page: currentPage, _limit: itemPerPage });
		const response = await getBooksService(queryParams);
		const books = await response.books;
		const totalBooks = response.totalBooks;
		return { books, totalBooks };
	}

	async updateBook(bookId, bookData) {
		await updateBookService(bookId, bookData);
	}

	async deleteBook(bookId) {
		await deleteBookService(bookId);
	}
}
