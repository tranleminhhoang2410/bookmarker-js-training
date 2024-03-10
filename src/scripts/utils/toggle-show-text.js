import { createElement } from './ui-control';

export const toggleShowText = (selector, originalText, limitCharacters) => {
	const textContainer = document.querySelector(selector);
	let isShowingMore = false;

	// Create text & button element
	const textElement = createElement('span');
	const button = createElement('button', 'btn show-description-btn');

	// Set original content for text & button
	let limitedText = '';

	if (originalText.length <= limitCharacters) {
		textElement.textContent = originalText;
	} else {
		limitedText = originalText.slice(0, limitCharacters) + ' ';
		textElement.textContent = limitedText;
		button.textContent = 'show more';
	}

	// Append text & button for textContainer
	textContainer.innerHTML = '';
	textContainer.appendChild(textElement);
	textContainer.appendChild(button);

	// Handle click on show more & show less button
	button.addEventListener('click', function () {
		if (!isShowingMore) {
			textElement.textContent = originalText + ' ';
			button.textContent = 'show less';
		} else {
			textElement.textContent = limitedText;
			button.textContent = 'show more';
		}
		isShowingMore = !isShowingMore; // Toggle showing state
	});
};

toggleShowText(
	'p.book-details-description',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam provident nobis nisi a quam tempore necessitatibus, voluptatum fuga repellendus deserunt ex officiis, perferendis fugiat aliquam cupiditate fugit, quod totam commodi?',
	50
);
