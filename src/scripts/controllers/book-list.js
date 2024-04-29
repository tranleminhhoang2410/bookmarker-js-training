import { PAGINATION } from '../constants/pagination';
import { SORT_STATUS } from '../constants/sort-status';

export default class BookListController {
  constructor(bookModel, bookView) {
    this.bookModel = bookModel;
    this.bookView = bookView;
    this.originalBooks = [];
    this.renderBooks = [];
    this.currentPage = 1;
    this.itemsPerPage = PAGINATION.ITEMS_PER_PAGE;
  }

  async init() {
    await this.displayBookList();
    this.bookView.bindPageChange(this.handlePageChange);
    this.bookView.bindInputChange(this.handleSearchBook);
    this.bookView.bindSortBook(this.handleSortBook);
    this.bookView.bindDeleteBook(this.handleDeleteBook);
  }

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

  handleSortBook = (sortStatus) => {
    switch (sortStatus) {
      case SORT_STATUS.ASCENDING:
        this.renderBooks.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        break;
      case SORT_STATUS.DESCENDING:
        this.renderBooks.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
        break;
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
