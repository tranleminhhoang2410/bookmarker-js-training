import viewDetailsIcon from '../../assets/images/svg/right-forward.svg';
import deleteIcon from '../../assets/images/svg/trash.svg';

const bookItemTemplate = (book) => {
  const { id, name, description, imageUrl } = book;

  return `
    <div class="book-primary-info">
      <h2 class="text-heading text-truncate book-name">${name}</h2>
      <p class="text-description text-truncate book-description">${description}</p>
      <div class="book-item-action">
        <button class="btn btn-square btn-secondary btn-view-details">
          <a href='/book-details?id=${id}'>
            <img loading="lazy" src=${viewDetailsIcon} alt="View Details" />
          </a>
        </button>
        <button class="btn btn-square btn-danger btn-delete">
          <img loading="lazy" src=${deleteIcon} alt="Delete" />
        </button>
      </div>
    </div>
    <div class="book-published-info">
      <span class="text-description book-published-time">9:00 AM</span>
        <figure class="book-published-image-frame">
          <img loading="lazy" src=${imageUrl} alt=${name} class="book-published-image" />
        </figure>
    </div>
  `;
};

export default bookItemTemplate;
