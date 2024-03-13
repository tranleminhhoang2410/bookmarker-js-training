export default class BookDetailsController {
	constructor(bookDetailsModel, bookDetailsView) {
		this.bookDetailsModel = bookDetailsModel;
		this.bookDetailsView = bookDetailsView;
	}

	async init() {
		await this.displayBookDetails();
		this.bookDetailsView.bindDeleteBook(this.handleDeleteBook);
	}

	displayBookDetails = async () => {
		const bookId = window.location.search.slice(4);
		try {
			const response = await this.bookDetailsModel.getBookById(bookId);
			this.bookDetailsView.bindGetBookDetails(response);
		} catch (error) {
			this.bookDetailsView.bindServerError();
			throw new Error(error);
		}
	};

	handleDeleteBook = async (bookId) => {
		await this.bookDetailsModel.deleteBook(bookId);
	};
}
