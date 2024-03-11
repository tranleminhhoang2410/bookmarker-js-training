import { timeFormat } from '../utils/timeFormat';
import { toggleShowText } from '../utils/toggle-show-text';
import forwardIcon from '../../assets/images/svg/left-forward.svg';
import deleteIcon from '../../assets/images/svg/trash.svg';
import editIcon from '../../assets/images/svg/edit.svg';

export const bookDetailsTemplate = (book = {}) => {
	const { name, description, authors, imageUrl, publishedDate, createdAt, updatedAt } = book;

	const descriptionRender = toggleShowText(description, 200);

	return `
        <div class="book-details-image-action">
					<figure class="book-details-image-frame">
						<img src=${imageUrl} alt=${name} class="book-details-image" />
					</figure>
					<div class="book-details-action">
						<button class="btn btn-square btn-secondary">
							<a href='/'>
                <img loading="lazy" src=${forwardIcon} alt="Back" />
              </a>
						</button>
						<button class="btn btn-square btn-danger">
							<img loading="lazy" src=${deleteIcon} alt="Delete" />
						</button>
						<button class="btn btn-rectangle btn-secondary btn-edit">
							<img src=${editIcon} alt="Edit" />
							<span class="create-btn-text text-description text-white">Edit</span>
						</button>
					</div>
				</div>
				<div class="book-details-info">
					<h2 class="text-heading book-details-heading">${name}</h2>
					<p class="book-details-description">
						${descriptionRender}
					</p>
					<ul class="book-details-info-list">
						<li class="book-details-info-item">
							<span>Author: </span>
							<span>${authors.join(', ')}</span>
						</li>
						<li class="book-details-info-item">
							<span>Published date: </span>
							<span>9:54 AM, ${publishedDate}</span>
						</li>
						<li class="book-details-info-item">
							<span>Created at: </span>
							<span>${timeFormat(parseInt(createdAt))}</span>
						</li>
						<li class="book-details-info-item">
							<span>Updated at: </span>
							<span>${timeFormat(parseInt(updatedAt))}</span>
						</li>
					</ul>
  `;
};
