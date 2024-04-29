import { createElement } from '../utils';

const createPaginationItem = (pageNumber, onPageChange, currentPage) => {
  const paginationItem = createElement('li', 'pagination-item');

  const button = createElement('button', 'btn btn-primary btn-square btn-pagination text-description');
  button.textContent = pageNumber;
  button.dataset.page = pageNumber;

  if (pageNumber === currentPage) {
    button.classList.add('btn-secondary', 'text-light', 'current');
    button.classList.remove('btn-primary');
  }

  button.addEventListener('click', () => onPageChange(pageNumber));
  paginationItem.appendChild(button);

  return paginationItem;
};

export const paginationTemplate = (totalItems, itemsPerPage, onPageChange, currentPage) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationList = createElement('ul', 'pagination-list');

  // Hide pagination when having only 1 page
  if (totalPages === 1) {
    return null;
  }

  for (let i = 1; i <= totalPages; i++) {
    paginationList.appendChild(createPaginationItem(i, onPageChange, currentPage));
  }

  return paginationList;
};
