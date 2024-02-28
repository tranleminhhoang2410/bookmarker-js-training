import BookModel from './models/bookModel';
import BookView from './views/bookView';
import BookController from './controllers/bookController';

const app = new BookController(new BookModel(), new BookView());
app.init();
