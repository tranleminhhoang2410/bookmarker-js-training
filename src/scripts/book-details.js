import BookDetailsModel from './models/bookDetailModel';
import BookDetailsView from './views/bookDetailsView';
import BookDetailsController from './controllers/bookDetailsController';

const app = new BookDetailsController(new BookDetailsModel(), new BookDetailsView());
app.init();
