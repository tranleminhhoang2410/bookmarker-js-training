export const pagination = (currentPage, totalItems, itemPerPage) => {
	const getPaginationNumbers = () => {
		let paginationItem = '';
		const totalPages = Math.ceil(totalItems / itemPerPage);
		for (let i = 1; i <= totalPages; i++) {
			paginationItem += `<li class='pagination-item'>
        <button class="btn btn-square text-description ${
					currentPage === i ? 'pagination-button current' : 'pagination-button'
				}">${i}</button>
      </li>`;
		}
		return paginationItem;
	};

	return `
			<ul class="pagination-list">
        ${getPaginationNumbers()}
			</ul>
  `;
};
