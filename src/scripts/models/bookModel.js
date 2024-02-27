import { addBookService, getBooksService } from "../../services/bookServices";

export default class BookModel {
    constructor() {
        this.books = [];
    }

    addBook = async (book) => {
        addBookService(book)
        
    }

    getBooks = async () => {
        const response = await getBooksService();
        return response;
    };
}