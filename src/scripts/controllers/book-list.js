import { PAGINATION, SORT } from '../constants';
import { sortArray } from '../utils';

export default class BookListController {
	constructor(bookModel, bookView) {
		this.bookModel = bookModel;
		this.bookView = bookView;
		this.originalBooks = [];
		this.renderBooks = [];
		this.currentPage = 1;
		this.itemsPerPage = PAGINATION.ITEMS_PER_PAGE;
		this.imageUrl = '';
		this.isImageLoading = false;
	}

	async init() {
		this.bookView.bindAddBook(this.handleGetImageUrl, this.handleAddBook);
		await this.displayBookList();
		this.bookView.bindPageChange(this.handlePageChange);
		this.bookView.bindInputChange(this.handleSearchBook);
		this.bookView.bindSortBook(this.handleSortBookByName);
		this.bookView.bindEditBook(this.handleGetBookById, this.handleEditBook);
		this.bookView.bindDeleteBook(this.handleDeleteBook);
	}

	handleGetImageUrl = async (fileUpload) => {
		const response = await this.bookModel.getImageUrl(fileUpload);
		return response;
	};

	handleGetBookById = async (bookId) => {
		const response = await this.bookModel.getBookById(bookId);
		return response;
	};

	handleAddBook = async (data) => {
		const response = await this.bookModel.addBook(data);
		this.renderBooks.unshift(response);
		this.originalBooks = [...this.renderBooks];
		this.updateBookList(this.originalBooks);
	};

	displayBookList = async () => {
		this.bookView.displaySkeletonBooks(PAGINATION.ITEMS_PER_PAGE);
		const response = await this.bookModel.getBooks();
		this.renderBooks = response;
		this.originalBooks = [...this.renderBooks];
		this.updateBookList(this.renderBooks);
	};

	updateBookList = (bookList) => {
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		const booksToShow = bookList.slice(startIndex, endIndex);
		this.bookView.displayBooks(bookList, booksToShow, this.currentPage);
	};

	handlePageChange = (pageNumber) => {
		this.currentPage = pageNumber;
		this.updateBookList(this.renderBooks);
	};

	handleSearchBook = (keyword) => {
		this.currentPage = 1;
		const searchTerm = keyword.trim().toLowerCase();

		// eslint-disable-next-line max-len
		const filteredBooks = this.renderBooks.filter((book) => book.name.toLowerCase().includes(searchTerm));

		this.updateBookList(filteredBooks);
	};

	handleSortBookByName = (sortStatus) => {
		switch (sortStatus) {
			case SORT.STATUS.ASCENDING: {
				const ascSortedBooks = sortArray(this.renderBooks, SORT.KEY.NAME, SORT.STATUS.ASCENDING);
				this.renderBooks = [...ascSortedBooks];
				break;
			}
			case SORT.STATUS.DESCENDING: {
				const descSortedBooks = sortArray(this.renderBooks, SORT.KEY.NAME, SORT.STATUS.DESCENDING);
				this.renderBooks = [...descSortedBooks];
				break;
			}
			default:
				this.renderBooks = [...this.originalBooks];
		}

		this.updateBookList(this.renderBooks);
	};

	handleEditBook = async (bookId, bookData) => {
		await this.bookModel.editBook(bookId, { ...bookData, imageUrl: this.imageUrl });
		this.displayBookList();
	};

	handleDeleteBook = async (bookId) => {
		await this.bookModel.deleteBook(bookId);
		// Refresh the book list from the model
		this.renderBooks = await this.bookModel.getBooks();
		this.originalBooks = [...this.renderBooks];

		// Adjust the current page if the last item on a page was deleted
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		if (startIndex >= this.renderBooks.length && this.currentPage > 1) {
			this.currentPage--; // Move back one page if the current page has no items
		}

		// Update the view with the new list of books
		this.updateBookList(this.renderBooks);
	};
}
