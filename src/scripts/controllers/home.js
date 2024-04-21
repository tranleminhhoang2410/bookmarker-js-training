export default class HomeController {
	constructor(bookModel, homeView) {
		this.bookModel = bookModel;
    this.homeView = homeView;

		this.currentPage = 1;
		this.itemsPerPage = 6;
		this.books = [];
	}

	async init() {
		await this.displayBookList();
		this.homeView.bindPageChange(this.handlePageChange);
		this.homeView.bindDeleteBook(this.handleDeleteBook);
		this.homeView.bindInputChange(this.handleSearchBook)
	}

	displayBookList = async () => {
		this.homeView.displaySkeletonBooks(6);
		const response = await this.bookModel.getBooks();
		this.books = response;
		this.updateBookList();
	};

	updateBookList = () => {
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		const booksToShow = this.books.slice(startIndex, endIndex);
		this.homeView.displayBooks(this.books, booksToShow, this.currentPage);
	};

	handlePageChange = (pageNumber) => {
		this.currentPage = pageNumber;
		this.updateBookList();
	};

	handleDeleteBook = async (bookId) => {
		await this.bookModel.deleteBook(bookId);
		await this.displayBookList();
	};

	handleSearchBook = (keyword) => {
		const searchTerm = keyword.trim().toLowerCase();
    const filteredBooks = this.books.filter(book => {
        return book.name.toLowerCase().includes(searchTerm);
    });
    // Hiển thị danh sách sách đã lọc
    this.homeView.displayBooks(this.books, filteredBooks, this.currentPage);
	}
}
