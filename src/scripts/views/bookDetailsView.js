import { bookDetailsTemplate } from '../templates/book-details';
import { confirmDialogTemplate } from '../templates/confirm-dialog';
import { serverErrorTemplate } from '../templates/server-error';
import { createElement, getElement } from '../utils/ui-control';

export default class BookDetailsView {
	constructor() {
		this.mainContent = getElement('.content');
		this.bookDetails = getElement('.book-details');

		this._initEventListeners();
	}

	_initEventListeners() {
		//Open confirm Modal
		this.bookDetails.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target.className.includes('btn-delete') || e.target.className.includes('delete-icon')) {
				const confirmModal = createElement('div', 'modal show');
				const confirmModalContent = createElement('div', 'modal-content container');
				confirmModalContent.innerHTML = confirmDialogTemplate();
				confirmModal.appendChild(confirmModalContent);
				this.mainContent.append(confirmModal);
			}
		});

		//Close modal
		this.mainContent.addEventListener('click', (e) => {
			if (e.target.className === 'cancel-btn') {
				const modal = getElement('.modal');
				modal.remove();
			}
		});
	}

	bindServerError() {
		this.mainContent.removeChild(this.bookDetails);
		this.mainContent.innerHTML = serverErrorTemplate();
	}

	bindGetBookDetails(book) {
		this.bookDetails.innerHTML = bookDetailsTemplate(book);
	}

	bindDeleteBook(handler) {
		this.mainContent.addEventListener('click', (e) => {
			if (e.target.className.includes('confirm-btn')) {
				const bookId = parseInt(window.location.search.slice(4));
				handler(bookId);
			}
		});
	}
}
