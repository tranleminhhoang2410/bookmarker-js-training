import { addBookService, getBooksService, deleteBookService, updateBookService } from '../services/bookServices';

export default class BookModel {
	async addBook(bookData) {
		await addBookService(bookData);
	}

	async getBooks() {
		const response = await getBooksService();
		return response;
	}

	async updateBook(bookId, bookData) {
		await updateBookService(bookId, bookData);
	}

	async deleteBook(bookId) {
		await deleteBookService(bookId);
	}
}
