import placeholderBookImage from '../../assets/images/png/book-placeholder.png';

export const bookItemTemplate = (book = {}, forwardIcon = '', editIcon = '') => {
	const { id, name, description, imageUrl } = book;

	return ` 
        <div class="book-primary-info">
            <h2 class="book-name text-heading">${name}</h2>
            <p class="book-description text-description">
                ${description}
            </p>
            <div class="book-item-action">
                <button data-book-id="${id}" class="btn btn-square btn-secondary">
                    <img loading="lazy" src=${forwardIcon} alt="View Details" />
                </button>
                <button class="btn btn-square btn-danger">
                    <img loading="lazy" src=${editIcon} alt="Delete" />
                </button>
            </div>
        </div>
        <div class="book-published-info">
            <span class="book-published-time text-description">9:00 AM</span>
            <figure class="book-published-image-frame">
                <img loading="lazy" src=${imageUrl || placeholderBookImage} alt="Book name" class="book-published-image" />
            </figure>
        </div>
    `;
};
