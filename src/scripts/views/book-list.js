// Constants
import { PAGINATION, SEARCH, BOOK_FORM, CONFIRM_DIALOG, SORT, TOAST } from '../constants';

// Utils
import { createElement, getElement, getElements, debounce, showToast, showModal, hideModal } from '../utils';

// Templates
import { bookItemTemplate } from '../templates/book-item';
import { listEmptyTemplate } from '../templates/list-empty';
import { paginationTemplate } from '../templates/pagination';

import { confirmDialogTemplate } from './../templates/confirm-dialog';
import { modalContentTemplate } from '../templates/modal-content';
import { toastTemplate } from '../templates/toast';
import { bookFormTemplate } from '../templates/book-form';
import { appendErrorMessage, validateField, validateForm } from '../utils/validation';

export default class BookView {
	constructor() {
		this.mainContent = getElement('.content');
		this.bookListWrapper = getElement('.book-list-wrapper');
		this.bookList = getElement('.book-list');
		this.searchBox = getElement('#search-box');
		this.sortBtns = getElements('.btn-sort');
		this.createBtn = getElement('#btn-create');
		this.sortStatus = '';
		this.selectedBookImageUrl = '';
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

	bindAddBook = (getImageUrlHandler, addHandler) => {
		this.createBtn.addEventListener('click', (e) => {
			e.preventDefault();
			// Create and show the book form
			const bookForm = bookFormTemplate();
			const bookFormContent = modalContentTemplate(bookForm);
			const bookFormModal = createElement('div', 'modal');

			showModal(bookFormModal, bookFormContent);

			this.mainContent.appendChild(bookFormModal);

			//Get form element
			const form = getElement('#book-form');
			const inputElements = getElements('.input-box');

			const fileUpload = getElement('#file-upload');
			const bookImgPreview = getElement('.book-img-preview');
			const bookNamePreview = getElement('.book-name-preview');
			const uploadBtn = getElement('.btn-upload');

			// Get image url
			fileUpload.addEventListener('change', async (event) => {
				const file = event.target.files[0];
				bookNamePreview.innerHTML = `Selected: ${file.name}`;
				bookImgPreview.src = URL.createObjectURL(file);
				bookImgPreview.style = 'width: 96px; height: 116px';
				uploadBtn.style = 'opacity: 0';

				const formData = new FormData();
				formData.append('image', file);

				this.selectedBookImageUrl = await getImageUrlHandler(formData);
			});

			// Handling form inputs for validation
			inputElements.forEach((input) => {
				input.addEventListener('input', () => {
					validateField(input, input.getAttribute('data-field-name'), input.value);
				});
			});

			// Get negative buttons from the modal
			const negativeButton = getElement('#' + BOOK_FORM.NEGATIVE_BUTTON_ID);

			// Handling the 'Cancel' button click
			negativeButton.addEventListener('click', () => {
				hideModal(bookFormModal);
			});

			// Handling the 'Save' button click within the form
			form.addEventListener('submit', (e) => {
				e.preventDefault();

				// Use FormData to retrieve form data
				const formData = new FormData(form);
				const name = formData.get('book-name');
				const authors = formData.get('book-authors');
				const publishedDate = formData.get('book-published-date');
				const description = formData.get('book-description');

				// validate all fields before submitting
				let isFormValid = true;

				inputElements.forEach((input) => {
					const error = validateForm(input.getAttribute('data-field-name'), input.value);

					if (error) {
						isFormValid = false;
						appendErrorMessage(input, error);
					}
				});

				// Stop execution if the form is not valid
				if (!isFormValid) {
					return;
				}

				const data = {
					name,
					authors,
					publishedDate,
					description,
					imageUrl: this.selectedBookImageUrl,
					createdAt: null,
					updatedAt: null,
					deletedAt: null
				};

				addHandler(data);

				// Remove the modal from the DOM
				hideModal(bookFormModal);

				// Show the toast message
				const toastContainer = createElement('div', 'toast-container');
				showToast(
					toastContainer,
					toastTemplate(TOAST.MESSAGE.SUCCESS, TOAST.DESCRIPTION.ADDED_BOOK),
					TOAST.DISPLAY_TIME
				);

				this.mainContent.appendChild(toastContainer);
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

	bindEditBook = (displayFormHandler, editHandler) => {
		this.mainContent.addEventListener('click', async (event) => {
			const btnDelete = event.target.closest('.btn-delete');
			if (btnDelete) {
				return;
			}

			const bookItem = event.target.closest('.book-item');
			if (bookItem) {
				const bookId = bookItem.getAttribute('data-book-id');
				const selectedBook = await displayFormHandler(bookId);

				// Create and show the book form
				const bookForm = bookFormTemplate(selectedBook, {
					formTitle: BOOK_FORM.TITLE.EDIT_BOOK(selectedBook.name)
				});
				const bookFormContent = modalContentTemplate(bookForm);
				const bookFormModal = createElement('div', 'modal');

				showModal(bookFormModal, bookFormContent);

				this.mainContent.appendChild(bookFormModal);

				const form = getElement('#book-form');

				// Handling the 'Save' button click within the form
				form.addEventListener('submit', (e) => {
					e.preventDefault();

					// Use FormData to retrieve form data
					const formData = new FormData(form);
					const name = formData.get('book-name');
					const authors = formData.get('book-authors');
					const publishedDate = formData.get('book-published-date');
					const description = formData.get('book-description');

					const data = {
						name,
						authors,
						publishedDate,
						description,
						updatedAt: new Date(),
						deletedAt: null
					};

					editHandler(bookId, data);

					// Remove the modal from the DOM
					this.mainContent.removeChild(bookFormModal);

					// Show the toast message
					const toastContainer = createElement('div', 'toast-container');
					showToast(toastContainer, toastTemplate(), TOAST.DISPLAY_TIME);

					this.mainContent.appendChild(toastContainer);
				});

				// Get negative buttons from the modal
				const negativeButton = getElement('#' + BOOK_FORM.NEGATIVE_BUTTON_ID);

				// Handling the 'Cancel' button click
				negativeButton.addEventListener('click', () => {
					hideModal(bookFormModal); // Remove the modal from the DOM
				});
			}
		});
	};

	bindDeleteBook(handler) {
		this.mainContent.addEventListener('click', (event) => {
			const btnDelete = event.target.closest('.btn-delete');

			if (btnDelete) {
				event.stopPropagation();
				const bookItem = event.target.closest('.book-item');
				const bookId = bookItem.getAttribute('data-book-id');
				// Create and show the confirm dialog
				const confirmDialog = confirmDialogTemplate();
				const confirmModalContent = modalContentTemplate(confirmDialog);
				const confirmModal = createElement('div', 'modal');

				showModal(confirmModal, confirmModalContent);

				this.mainContent.appendChild(confirmModal);

				// Get the positive and negative buttons from the modal
				const positiveButton = getElement(`#${CONFIRM_DIALOG.POSITIVE_BUTTON_ID}`);
				const negativeButton = getElement(`#${CONFIRM_DIALOG.NEGATIVE_BUTTON_ID}`);

				// Handling the 'OK' button click
				positiveButton.addEventListener('click', () => {
					handler(bookId);
					// Remove the modal from the DOM
					this.mainContent.removeChild(confirmModal);

					// Show the toast message
					const toastContainer = createElement('div', 'toast-container');
					showToast(toastContainer, toastTemplate(), TOAST.DISPLAY_TIME);

					this.mainContent.appendChild(toastContainer);
				});

				// Handling the 'Cancel' button click
				negativeButton.addEventListener('click', () => {
					hideModal(confirmModal);
				});
			}
		});
	}
}
