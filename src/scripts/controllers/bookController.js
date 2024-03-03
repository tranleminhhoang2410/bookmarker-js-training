export default class BookController {
	constructor(bookModel, bookView) {
		this.bookModel = bookModel;
		this.bookView = bookView;
	}

	async init() {
		this.bookView.displaySkeletonBooks(6);
		await this.onBookListChanged();
	}

	onBookListChanged = async () => {
		const response = await this.bookModel.getBooks();
		this.bookView.displayBooks(response.books, response.totalBooks);
	};
}
