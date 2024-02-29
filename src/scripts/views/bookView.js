import { bookItemTemplate } from '../templates/book-item';
import { createElement, getElement } from '../utils/ui-control';
import forwardIcon from '../../assets/images/svg/right-forward.svg';
import editIcon from '../../assets/images/svg/trash.svg';

export default class BookView {
	constructor() {
		this.bookList = getElement('.book-list');
	}

	displaySkeletonBooks = (count) => {
		this.bookList.innerHTML = '';
		for (let i = 0; i < count; i++) {
			const skeletonBookItem = createElement('li', 'book-item loading');
			skeletonBookItem.innerHTML = bookItemTemplate();

			this.bookList.append(skeletonBookItem);
		}
	};

	displayBooks = (books) => {
		while (this.bookList.firstChild) {
			this.bookList.removeChild(this.bookList.firstChild);
		}
		if (books.length === 0) {
			const p = this.createElement('p');
			p.textContent = 'No product here';
			this.todoList.append(p);
		} else {
			books?.forEach((book) => {
				const bookItem = createElement('li', 'book-item');
				bookItem.innerHTML = bookItemTemplate(book, forwardIcon, editIcon);

				this.bookList.append(bookItem);
			});
		}
	};
}
