import placeholderBookImage from '../../assets/images/png/book-placeholder.png';

export const bookItemTemplate = (book = {}, forwardIcon = '', editIcon = '') => {
	const { id, name, description, imageUrl } = book;

	return ` 
        <div class="book-primary-info">
            <h2 class="book-name">${name}</h2>
            <p class="book-description">
                ${description}
            </p>
            <div class="book-item-action">
                <button data-book-id="${id}" class="book-item-action-btn view-details">
                    <img loading="lazy" src=${forwardIcon} alt="View Details" />
                </button>
                <button class="book-item-action-btn delete">
                    <img loading="lazy" src=${editIcon} alt="Delete" />
                </button>
            </div>
        </div>
        <div class="book-published-info">
            <span class="book-published-time">9:00 AM</span>
            <figure class="book-published-image-frame">
                <img loading="lazy" src=${imageUrl || placeholderBookImage} alt="Book name" class="book-published-image" />
            </figure>
        </div>
    `;
};
