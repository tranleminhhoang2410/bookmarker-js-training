import { getBookByIdService, updateBookService, deleteBookService } from '../services/bookServices';

export default class BookDetailsModel {
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
