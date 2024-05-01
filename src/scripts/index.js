import BookModel from './models/book';
import BookLisView from './views/book-list';
import BookListController from './controllers/book-list';

const app = new BookListController(new BookModel(), new BookLisView());

app.init();
