import { bookItemTemplate } from '../templates/book-item';
import { createElement, getElement } from '../utils/ui-control';
import { pagination } from '../templates/pagination';
import { listEmpty } from '../templates/list-empty';
import { mutationFormTemplate } from '../templates/mutation-form';
import { confirmDialogTemplate } from '../templates/confirm-dialog';
import { showToast } from '../utils/toast-control';
import { toastMessageTemplate } from '../templates/toast-message';
import { TOAST } from '../constants/toast';

export default class BookView {
	constructor() {
		this.mainContent = getElement('.content');
		this.bookListWrapper = getElement('.book-list-wrapper');
		this.bookList = getElement('.book-list');
		this.createBtn = getElement('.btn-create');

		this._initEventListener();
	}

	_initEventListener = () => {
		//Open modal when click on create button
		this.createBtn.addEventListener('click', () => {
			const createModal = createElement('div', 'modal show');
			const createModalContent = createElement('div', 'modal-content container');
			createModalContent.innerHTML = mutationFormTemplate();

			createModal.appendChild(createModalContent);
			this.mainContent.appendChild(createModal);
		});

		//Close modal
		this.mainContent.addEventListener('click', (e) => {
			if (e.target.className.includes('cancel-btn')) {
				const modal = getElement('.modal');
				modal.remove();
			}
		});
	};

	displayBooks = (books) => {
		while (this.bookList.firstChild) {
			this.bookList.removeChild(this.bookList.firstChild);
		}
		if (books.length === 0) {
			const bookListEmpty = createElement('div', 'book-list-empty');
			bookListEmpty.innerHTML = listEmpty();
			this.bookListWrapper.appendChild(bookListEmpty);
			this.bookListWrapper.removeChild(this.bookList);
		} else {
			books.forEach((book) => {
				const bookItem = createElement('li', 'book-item');
				bookItem.innerHTML = bookItemTemplate(book);
				bookItem.setAttribute('data-book-id', book.id);
				this.bookList.appendChild(bookItem);
			});
		}
	};

	bindDeleteBook(handler) {
		this.mainContent.addEventListener('click', (e) => {
			let targetElement = e.target;
			if (targetElement.className.includes('delete-icon')) {
				targetElement = e.target.parentElement;
			}
			if (targetElement.className.includes('btn-delete')) {
				const bookId = targetElement.parentElement.parentElement.parentElement.getAttribute('data-book-id');
				const confirmModal = createElement('div', 'modal show');
				const confirmModalContent = createElement('div', 'modal-content container');
				confirmModalContent.innerHTML = confirmDialogTemplate();
				confirmModal.appendChild(confirmModalContent);
				this.mainContent.append(confirmModal);

				const confirmDeleteBtn = getElement('.confirm-btn');

				confirmDeleteBtn.addEventListener('click', () => {
					handler(bookId);
					//Close modal
					confirmModal.remove();

					//Show toast
					const toastSelector = createElement('div', 'toast success');
					this.mainContent.append(toastSelector);
					showToast(toastSelector, toastMessageTemplate(TOAST.MESSAGE.SUCCESS, TOAST.DESCRIPTION.DELETE), 3000);
				});
			}
		});
	}
}
