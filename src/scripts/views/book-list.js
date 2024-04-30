// Constants
import { PAGINATION, SEARCH, FORM_VALIDATION } from '../constants';

// Utils
import { createElement, getElement, getElements, debounce } from '../utils';

// Templates
import bookItemTemplate from '../templates/book-item';
import { listEmptyTemplate } from '../templates/list-empty';
import { paginationTemplate } from '../templates/pagination';

import { BOOK_FORM, CONFIRM_DIALOG, SORT } from '../constants';
import { confirmDialogTemplate } from './../templates/confirm-dialog';
import { modalContentTemplate } from '../templates/modal';
import { toastMessageTemplate } from '../templates/toast-message';
import { bookFormTemplate } from '../templates/book-form';

export default class BookView {
	constructor() {
		this.mainContent = getElement('.content');
		this.bookListWrapper = getElement('.book-list-wrapper');
		this.bookList = getElement('.book-list');
		this.searchBox = getElement('#search-box');
		this.sortBtns = getElements('.btn-sort');
		this.createBtn = getElement('#btn-create');
		this.sortStatus = '';
	}

	bindGetImageUrl = (handler) => {
		this.mainContent.addEventListener('change', (e) => {
			if (e.target.type === 'file') {
				const bookImgPreview = getElement('.book-img-preview');
				const bookNamePreview = getElement('.book-name-preview');
				const uploadBtn = getElement('.btn-upload');
				const file = e.target.files[0];

				bookNamePreview.innerHTML = `Selected: ${e.target.files[0].name}`;
				bookImgPreview.src = URL.createObjectURL(e.target.files[0]);
				bookImgPreview.style = 'width: 96px; height: 116px';
				uploadBtn.style = 'opacity: 0';

				const formData = new FormData();
				formData.append('image', file);

				handler(formData);
			}
		});
	};

	bindAddBook = (handler) => {
		this.createBtn.addEventListener('click', (e) => {
			e.preventDefault();
			// Create and show the book form
			const bookForm = bookFormTemplate();
			const bookFormContent = modalContentTemplate(bookForm);
			const bookFormModal = createElement('div', 'modal');
			bookFormModal.innerHTML = bookFormContent;
			this.mainContent.appendChild(bookFormModal);

			const form = getElement('#book-form');

			// Get negative buttons from the modal
			const negativeButton = getElement('#' + BOOK_FORM.NEGATIVE_BUTTON_ID);

			// Handling the 'Cancel' button click
			negativeButton.addEventListener('click', () => {
				this.mainContent.removeChild(bookFormModal); // Remove the modal from the DOM
			});

			// Handling the 'Save' button click within the form
			form.addEventListener('submit', (e) => {
				e.preventDefault();

				// Use FormData to retrieve form data
				const formData = new FormData(form);
				const name = formData.get('book-name');
				const author = formData.get('book-author');
				const publishedDate = formData.get('book-published-date');
				const description = formData.get('book-description');

				const data = {
					name,
					author,
					publishedDate,
					description,
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null
				};

				handler(data);

				// Remove the modal from the DOM
				this.mainContent.removeChild(bookFormModal);

				// Show the toast message
				const toastMessage = toastMessageTemplate();
				const toastContainer = createElement('div', 'toast-container');
				toastContainer.innerHTML = toastMessage;
				this.mainContent.appendChild(toastContainer);

				// Automatically hide the toast message after a certain time
				setTimeout(() => {
					this.mainContent.removeChild(toastContainer);
				}, 3000); // Hide after 3 seconds (adjust as needed)
			});
		});
	};

	displaySkeletonBooks = (count) => {
		for (let i = 0; i < count; i++) {
			const skeletonBookItem = createElement('li', 'book-item loading');
			skeletonBookItem.innerHTML = bookItemTemplate({});
			this.bookList.appendChild(skeletonBookItem);
		}
	};

	removeExistingElement = (parentElement, childElementSelector) => {
		const existingElement = getElement(childElementSelector);
		if (existingElement) parentElement.removeChild(existingElement);
	};
	displayBooks = (bookList, booksShowing, currentPage) => {
		while (this.bookList.firstChild) {
			this.bookList.removeChild(this.bookList.firstChild);
		}

		// Remove existing Pagination
		this.removeExistingElement(this.bookListWrapper, '.pagination');

		// Remove existing Empty list
		this.removeExistingElement(this.bookListWrapper, '.list-empty');

		if (booksShowing.length === 0) {
			const bookListEmpty = createElement('div', 'list-empty');
			bookListEmpty.innerHTML = listEmptyTemplate();
			this.bookListWrapper.appendChild(bookListEmpty);
			this.bookListWrapper.removeChild(this.bookList);
		} else {
			booksShowing.forEach((book) => {
				const bookItem = createElement('li', 'book-item');
				bookItem.innerHTML = bookItemTemplate(book);
				bookItem.setAttribute('data-book-id', book.id);
				this.bookList.appendChild(bookItem);
				this.bookListWrapper.appendChild(this.bookList);
			});

			// Display Pagination
			if (bookList.length > PAGINATION.ITEMS_PER_PAGE) {
				const paginationContainer = createElement('div', 'pagination');
				paginationContainer.appendChild(
					paginationTemplate(
						bookList.length,
						PAGINATION.ITEMS_PER_PAGE,
						() => {
							this.bookListWrapper.removeChild(paginationContainer);
						},
						currentPage
					)
				);
				this.bookListWrapper.appendChild(paginationContainer);
			}
		}
	};

	bindInputChange = (handler) => {
		const debouncedHandler = debounce(handler, SEARCH.DELAY_TIME);
		this.searchBox.addEventListener('input', (event) => {
			debouncedHandler(event.target.value);
		});
	};

	bindPageChange = (handler) => {
		this.mainContent.addEventListener('click', (event) => {
			if (event.target.classList.contains('btn-pagination')) {
				const pageNumber = parseInt(event.target.dataset.page, 10);
				if (pageNumber) {
					handler(pageNumber);
				}
			}
		});
	};

	toggleSortStatus = (target) => {
		const isAscending = target.classList.contains('asc');
		const isDescending = target.classList.contains('desc');
		const oppositeClass = isAscending ? 'desc' : 'asc';

		let newStatus = '';

		if (isAscending) {
			newStatus = SORT.STATUS.ASCENDING;
		} else if (isDescending) {
			newStatus = SORT.STATUS.DESCENDING;
		}

		// Remove 'active' class from the opposite sort button if it exists
		const oppositeButton = target.parentNode.querySelector(`.${oppositeClass}`);
		if (oppositeButton) {
			oppositeButton.classList.remove('active');
		}

		// Toggle the current sort status and the 'active' class on the current button
		if (newStatus === this.sortStatus) {
			// If the current status matches the new, reset to default and remove 'active'
			this.sortStatus = '';
			target.classList.remove('active');
		} else {
			// Otherwise, update to the new status and add 'active'
			this.sortStatus = newStatus;
			target.classList.add('active');
		}
	};
	bindSortBook = (handler) => {
		this.sortBtns.forEach((btn) => {
			btn.addEventListener('click', (event) => {
				this.toggleSortStatus(event.target);
				handler(this.sortStatus);
			});
		});
	};

	bindDisplayEditForm = (handler) => {
		this.mainContent.addEventListener('click', async (event) => {
			const bookItem = event.target.closest('.book-item');
			if (bookItem) {
				const bookId = bookItem.getAttribute('data-book-id');
				const selectedBook = await handler(bookId);

				// Create and show the book form
				const bookForm = bookFormTemplate(BOOK_FORM.TITLE.EDIT_BOOK(selectedBook.name), selectedBook);
				const bookFormContent = modalContentTemplate(bookForm);
				const bookFormModal = createElement('div', 'modal');
				bookFormModal.innerHTML = bookFormContent;
				this.mainContent.appendChild(bookFormModal);

				// Get negative buttons from the modal
				const negativeButton = getElement('#' + BOOK_FORM.NEGATIVE_BUTTON_ID);

				// Handling the 'Cancel' button click
				negativeButton.addEventListener('click', () => {
					this.mainContent.removeChild(bookFormModal); // Remove the modal from the DOM
				});

				const form = getElement('#book-form');
				// Pre-fill the form
				form.elements['book-name'].value = selectedBook.name;
				form.elements['book-author'].value = selectedBook.author;
				form.elements['book-published-date'].value = selectedBook.publishedDate;
				form.elements['book-description'].textContent = selectedBook.description;

				// Handling the 'Cancel' button click
				negativeButton.addEventListener('click', () => {
					this.mainContent.removeChild(bookFormModal); // Remove the modal from the DOM
				});
			}
		});
	};

	// bindUpdateBook = (handler) => {
	// 	this.mainContent.addEventListener('click', (event) => {
	// 		const bookItem = event.target.closest('.book-item');
	// 		if (bookItem) {
	// 			// Create and show the book form
	// 			const bookForm = bookFormTemplate(bookItem);
	// 			const bookFormContent = modalContentTemplate(bookForm);
	// 			const bookFormModal = createElement('div', 'modal');
	// 			bookFormModal.innerHTML = bookFormContent;
	// 			this.mainContent.appendChild(bookFormModal);

	// 			const form = getElement('#book-form');

	// 			// Get negative buttons from the modal
	// 			const negativeButton = getElement('#' + BOOK_FORM.NEGATIVE_BUTTON_ID);

	// 			// Handling the 'Cancel' button click
	// 			negativeButton.addEventListener('click', () => {
	// 				this.mainContent.removeChild(bookFormModal); // Remove the modal from the DOM
	// 			});
	// 			const bookId = bookItem.getAttribute('data-book-id');

	// 			// Handling the 'Save' button click within the form
	// 			form.addEventListener('submit', (e) => {
	// 				e.preventDefault();

	// 				// Use FormData to retrieve form data
	// 				const formData = new FormData(form);
	// 				const name = formData.get('book-name');
	// 				const author = formData.get('book-author');
	// 				const publishedDate = formData.get('book-published-date');
	// 				const description = formData.get('book-description');

	// 				const data = {
	// 					name,
	// 					author,
	// 					publishedDate,
	// 					description,
	// 					createdAt: new Date(),
	// 					updatedAt: new Date(),
	// 					deletedAt: null
	// 				};

	// 				handler(bookId, data);

	// 				// Remove the modal from the DOM
	// 				this.mainContent.removeChild(bookFormModal);

	// 				// Show the toast message
	// 				const toastMessage = toastMessageTemplate();
	// 				const toastContainer = createElement('div', 'toast-container');
	// 				toastContainer.innerHTML = toastMessage;
	// 				this.mainContent.appendChild(toastContainer);

	// 				// Automatically hide the toast message after a certain time
	// 				setTimeout(() => {
	// 					this.mainContent.removeChild(toastContainer);
	// 				}, 3000); // Hide after 3 seconds (adjust as needed)
	// 			});
	// 		}
	// 	});
	// };

	bindDeleteBook = (handler) => {
		this.mainContent.addEventListener('click', (event) => {
			const btnDelete = event.target.closest('.btn-delete');

			if (btnDelete) {
				const bookItem = event.target.closest('.book-item');
				const bookId = bookItem.getAttribute('data-book-id');

				// Create and show the confirm dialog
				const confirmDialog = confirmDialogTemplate();
				const confirmModalContent = modalContentTemplate(confirmDialog);
				const confirmModal = createElement('div', 'modal');
				confirmModal.innerHTML = confirmModalContent;
				this.mainContent.appendChild(confirmModal);

				// Get the positive and negative buttons from the modal
				const positiveButton = getElement('#' + CONFIRM_DIALOG.POSITIVE_BUTTON_ID);
				const negativeButton = getElement('#' + CONFIRM_DIALOG.NEGATIVE_BUTTON_ID);

				// Handling the 'OK' button click
				positiveButton.addEventListener('click', () => {
					handler(bookId); // Call the delete handler with the bookId
					this.mainContent.removeChild(confirmModal); // Remove the modal from the DOM

					// Show the toast message
					const toastMessage = toastMessageTemplate('Book deleted', `Book with ID ${bookId} has been deleted.`);
					const toastContainer = createElement('div', 'toast-container');
					toastContainer.innerHTML = toastMessage;
					this.mainContent.appendChild(toastContainer);

					// Automatically hide the toast message after a certain time
					setTimeout(() => {
						this.mainContent.removeChild(toastContainer);
					}, 3000); // Hide after 3 seconds (adjust as needed)
				});

				// Handling the 'Cancel' button click
				negativeButton.addEventListener('click', () => {
					this.mainContent.removeChild(confirmModal); // Remove the modal from the DOM
				});
			}
		});
	};
}
