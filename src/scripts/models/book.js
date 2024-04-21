import { addBookService, getBooksService, deleteBookService, updateBookService, getBookByIdService } from '../services/bookServices';

export default class BookModel {
	async addBook(bookData) {
		await addBookService(bookData);
	}

	async getBooks() {
		const response = await getBooksService();
		return response;
	}

	async getBookById(bookId) {
    const response = await getBookByIdService(bookId);
    return response;
  }


	async updateBook(bookId, bookData) {
		await updateBookService(bookId, bookData);
	}

	async deleteBook(bookId) {
		await deleteBookService(bookId);
	}
}
