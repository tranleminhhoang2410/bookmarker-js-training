export default class BookDetailsController {
  constructor(bookModel, bookDetailsView) {
    this.bookModel = bookModel;
    this.bookDetailsView = bookDetailsView;
  }

  async init() {
    await this.displayBookDetails();
  }

  displayBookDetails = async () => {
    const bookId = window.location.search.slice(4);
    this.bookDetailsView.displaySkeletonBookDetails();
    try {
      const response = await this.bookModel.getBookById(bookId);
      this.bookDetailsView.getBookDetails(response);
    } catch (error) {
      this.bookDetailsView.displayServerError();
      throw new Error(error);
    }
  };
}
