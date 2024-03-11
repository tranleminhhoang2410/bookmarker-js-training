import { bookDetailsTemplate } from '../templates/book-details';
import { serverErrorTemplate } from '../templates/server-error';
import { getElement } from '../utils/ui-control';

export default class BookDetailsView {
	constructor() {
		this.mainContent = getElement('.content');
		this.bookDetails = getElement('.book-details');
	}

	bindServerError() {
		this.mainContent.removeChild(this.bookDetails);
		this.mainContent.innerHTML = serverErrorTemplate();
	}

	bindGetBookDetails(book) {
		this.bookDetails.innerHTML = bookDetailsTemplate(book);
	}
}
