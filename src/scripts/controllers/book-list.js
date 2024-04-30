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
		this.bookView.bindGetImageUrl(this.handleGetImageUrl);
		this.bookView.bindAddBook(this.handleAddBook);
		await this.displayBookList();
		this.bookView.bindPageChange(this.handlePageChange);
		this.bookView.bindInputChange(this.handleSearchBook);
		this.bookView.bindSortBook(this.handleSortBookByName);
		this.bookView.bindDeleteBook(this.handleDeleteBook);
	}

	handleGetImageUrl = async (fileUpload) => {
		const response = await this.bookModel.getImageUrl(fileUpload);
		this.imageUrl = await response;
		this.isImageLoading = true;
	};

	handleAddBook = async (data) => {
		if (!this.isImageLoading) {
			// Nếu isImageLoading không true, chờ cho đến khi nó trở thành true
			await new Promise((resolve) => {
				const interval = setInterval(() => {
					if (this.isImageLoading) {
						clearInterval(interval);
						resolve();
					}
				}, 100); // Kiểm tra mỗi 100ms
			});
		}

		const response = await this.bookModel.addBook({ ...data, imageUrl: this.imageUrl });
		this.renderBooks.unshift(response);
		this.updateBookList(this.renderBooks);
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

	handleDeleteBook = async (bookId) => {
		await this.bookModel.deleteBook(bookId);
		this.displayBookList();
	};
}
