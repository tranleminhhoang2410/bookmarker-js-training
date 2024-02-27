export default class BookController {
    constructor(bookModel, bookView) {
        this.bookModel = bookModel;
        this.bookView = bookView;
    }

    handleAddBook = async (data) => {
        try {
            await this.bookModel.addBook(data);
        } catch (error) {
            console.log(error);
        }
    }

    handleGetAllBooks = async () => {
        try {
            const response = await this.bookModel.getBooks();
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
