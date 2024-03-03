import { bookItemTemplate } from '../templates/book-item';
import { createElement, getElement } from '../utils/ui-control';
import forwardIcon from '../../assets/images/svg/right-forward.svg';
import editIcon from '../../assets/images/svg/trash.svg';
import { pagination } from '../templates/pagination';

export default class BookView {
	constructor() {
		this.bookList = getElement('.book-list');
	}

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
			const p = createElement('p');
			p.textContent = 'No product here';
			this.bookList.append(p);
		} else {
			booksInPage?.forEach((book) => {
				const bookItem = createElement('li', 'book-item');
				bookItem.innerHTML = bookItemTemplate(book, forwardIcon, editIcon);

				bookItem.querySelectorAll('.book-item-action-btn.view-details').forEach((button) => {
					button.addEventListener('click', function (e) {
						e.preventDefault();
						const bookId = this.getAttribute('data-book-id');
						window.location.href = `/book-details/${bookId}`;
					});
				});
				this.bookList.append(bookItem);
			});
			const bookListWrapper = getElement('.book-list-wrapper');
			const paginationWrapper = createElement('div', 'pagination');
			paginationWrapper.innerHTML = pagination(1, totalBooks, 6);
			bookListWrapper.append(paginationWrapper);
		}
	};
}
