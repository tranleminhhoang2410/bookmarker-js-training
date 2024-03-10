export default class BookDetailsController {
	constructor(bookDetailsModel, bookDetailsView) {
		this.bookDetailsModel = bookDetailsModel;
		this.bookDetailsView = bookDetailsView;
	}

	async init() {
		await this.displayBookDetails();
	}

	displayBookDetails = async () => {
		const bookId = window.location.search.slice(4);
		const response = await this.bookDetailsModel.getBookById(bookId);
		this.bookDetailsView.bindGetBookDetails(response);
	};
}
