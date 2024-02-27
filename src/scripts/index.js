import BookModel from "./models/bookModel";
import BookView from "./views/bookView";
import BookController from "./controllers/bookController";

const bookModel = new BookModel();
const bookView = new BookView();
const bookController = new BookController(bookModel, bookView);