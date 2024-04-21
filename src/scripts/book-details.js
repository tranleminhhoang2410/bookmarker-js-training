import BookModel from './models/book';
import BookDetailsView from './views/book-details';
import BookDetailsController from './controllers/book-details';

const app = new BookDetailsController(new BookModel(), new BookDetailsView());
app.init();
