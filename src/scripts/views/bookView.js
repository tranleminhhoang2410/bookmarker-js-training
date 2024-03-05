import { bookItemTemplate } from '../templates/book-item';
import { createElement, getAllElements, getElement } from '../utils/ui-control';
import forwardIcon from '../../assets/images/svg/right-forward.svg';
import editIcon from '../../assets/images/svg/trash.svg';
import { pagination } from '../templates/pagination';
import { listEmpty } from '../templates/list-empty';
import { mutationFormTemplate } from '../templates/mutation-form';

export default class BookView {
	constructor() {
		this.content = getElement('.content');
		this.bookListWrapper = getElement('.book-list-wrapper');
		this.bookList = getElement('.book-list');
		this.bookItem = getElement('.book-item');
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
			this.content.appendChild(createModal);

			_closeModal(createModal);
		});

		const _closeModal = (modalType) => {
			const cancelBtn = getElement('.btn-cancel');
			cancelBtn.addEventListener('click', () => {
				this.content.removeChild(modalType);
			});
		};
	};

	displaySkeletonBooks = (count) => {
		this.bookList.innerHTML = '';
		if (count === 0) {
			const p = createElement('p');
			p.textContent = 'No product here';
			this.bookList.append(p);
		} else {
			for (let i = 0; i < count; i++) {
				const skeletonBookItem = createElement('li', 'book-item loading');
				skeletonBookItem.innerHTML = bookItemTemplate();

				this.bookList.append(skeletonBookItem);
			}
		}
	};

	displayBooks = (booksInPage, totalBooks) => {
		while (this.bookList.firstChild) {
			this.bookList.removeChild(this.bookList.firstChild);
		}
		if (booksInPage.length === 0) {
			const bookListEmpty = createElement('div', 'book-list-empty');
			bookListEmpty.innerHTML = listEmpty();
			this.bookListWrapper.appendChild(bookListEmpty);
			this.bookListWrapper.removeChild(this.bookList);
		} else {
			booksInPage?.forEach((book) => {
				const bookItem = createElement('li', 'book-item');
				bookItem.innerHTML = bookItemTemplate(book, forwardIcon, editIcon);
				bookItem.setAttribute('data-book-id', book.id);
				this.bookList.appendChild(bookItem);
			});
			const bookListWrapper = getElement('.book-list-wrapper');
			const paginationWrapper = createElement('div', 'pagination');
			paginationWrapper.innerHTML = pagination(1, totalBooks, 6);
			bookListWrapper.append(paginationWrapper);
		}
	};
}
