import { createElement } from '../utils/ui-control';

const createPaginationItem = (pageNumber, onPageChange, currentPage) => {
	const paginationItem = createElement('li', 'pagination-item');
	const button = createElement('button', 'btn btn-square pagination-button');
	button.textContent = pageNumber;
	button.dataset.page = pageNumber;
	if (pageNumber === currentPage) {
		button.classList.add('current');
	}
	button.addEventListener('click', () => onPageChange(pageNumber));
	paginationItem.appendChild(button);
	return paginationItem;
};
export const pagination = (totalItems, itemsPerPage, onPageChange, currentPage) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const paginationList = createElement('ul', 'pagination-list');

	for (let i = 1; i <= totalPages; i++) {
		paginationList.appendChild(createPaginationItem(i, onPageChange, currentPage));
	}

	return paginationList;
};
