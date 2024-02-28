export default class BookController {
	constructor(bookModel, bookView) {
		this.bookModel = bookModel;
		this.bookView = bookView;
	}

	async init() {
		await this.onBookListChanged();
	}

	onBookListChanged = async () => {
		const response = await this.bookModel.getBooks();
		this.bookView.displayBooks(response);
	};
}
