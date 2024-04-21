import BookModel from './models/book';
import HomeView from './views/home';
import HomeController from './controllers/home';

const app = new HomeController(new BookModel(), new HomeView());
app.init();
