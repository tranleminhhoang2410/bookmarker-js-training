import { TOAST } from '../constants/toast';
import { bookDetailsTemplate } from '../templates/book-details';
import { confirmDialogTemplate } from '../templates/confirm-dialog';
import { serverErrorTemplate } from '../templates/server-error';
import { toastMessageTemplate } from '../templates/toast-message';
import { showToast } from '../utils/toast-control';
import { createElement, getElement } from '../utils/ui-control';

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

	bindDeleteBook(handler) {
		this.mainContent.addEventListener('click', (e) => {
			let targetElement = e.target;
			if (targetElement.className.includes('delete-icon')) {
				targetElement = e.target.parentElement;
			}
			if (targetElement.className.includes('btn-delete')) {
				const bookId = parseInt(window.location.search.slice(4));
				const confirmModal = createElement('div', 'modal show');
				const confirmModalContent = createElement('div', 'modal-content container');
				confirmModalContent.innerHTML = confirmDialogTemplate();
				confirmModal.appendChild(confirmModalContent);
				this.mainContent.append(confirmModal);

				const confirmDeleteBtn = getElement('.confirm-btn');

				confirmDeleteBtn.addEventListener('click', (e) => {
					e.preventDefault();
					handler(bookId);

					//Close confirm modal
					confirmModal.remove();

					//Show toast
					const toastSelector = createElement('div', 'toast success');
					this.mainContent.append(toastSelector);
					showToast(toastSelector, toastMessageTemplate(TOAST.MESSAGE.SUCCESS, TOAST.DESCRIPTION.DELETE), 3000);

					//Navigate to home
					window.location.href = '/';
				});
			}
		});
	}
}
