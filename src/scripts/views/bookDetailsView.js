import { bookDetailsTemplate } from '../templates/book-details';
import { getElement } from '../utils/ui-control';
import forwardIcon from '../../assets/images/svg/left-forward.svg';
import deleteIcon from '../../assets/images/svg/trash.svg';
import editIcon from '../../assets/images/svg/edit.svg';

export default class BookDetailsView {
	constructor() {
		this.bookDetails = getElement('.book-details');
	}

	bindGetBookDetails(book) {
		this.bookDetails.innerHTML = bookDetailsTemplate(book, forwardIcon, deleteIcon, editIcon);
	}
}
