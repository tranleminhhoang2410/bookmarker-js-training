export default class BookController {
	constructor(bookModel, bookView) {
		this.bookModel = bookModel;
		this.bookView = bookView;
		this.currentPage = 1;
		this.itemsPerPage = 6;
		this.books = [];
	}

	async init() {
		await this.onBookListChanged();
		this.bookView.bindPageChange(this.handlePageChange);
		this.bookView.bindDeleteBook(this.handleDeleteBook);
	}

	onBookListChanged = async () => {
		const response = await this.bookModel.getBooks();
		this.books = response;
		this._updateBooksView();
	};

	_updateBooksView = () => {
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		const booksToShow = this.books.slice(startIndex, endIndex);
		this.bookView.displayBooks(this.books, booksToShow, this.currentPage);
	};

	handlePageChange = (pageNumber) => {
		this.currentPage = pageNumber;
		this._updateBooksView();
	};

	handleDeleteBook = async (bookId) => {
		await this.bookModel.deleteBook(bookId);
		await this.onBookListChanged();
	};
}
