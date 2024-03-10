export const toggleShowText = (originalText, limitCharacters) => {
	let showMoreHtml = '';

	if (originalText.length <= limitCharacters) {
		showMoreHtml = `<span>${originalText}</span>`;
	} else {
		const limitedText = originalText.slice(0, limitCharacters) + '...';
		showMoreHtml = `
            <span class="text-content">${limitedText}</span>
            <button class="btn show-description-btn show-more" onclick="toggleText(this, '${originalText}', ${limitCharacters})">show more</button>
        `;
	}

	return showMoreHtml;
};

window.toggleText = (element, fullText, limit) => {
	const parentNode = element.parentNode;
	const isShowingLess = element.classList.contains('show-more');

	if (isShowingLess) {
		parentNode.innerHTML = `
			<span>${fullText}</span> 
			<button class="btn show-description-btn show-less" onclick="toggleText(this, '${fullText}', ${limit})">show less</button>
		`;
	} else {
		const limitedText = fullText.slice(0, limit) + '...';
		parentNode.innerHTML = `
			<span>${limitedText}</span> 
			<button class="btn show-description-btn show-more" onclick="toggleText(this, '${fullText}', ${limit})">show more</button>
		`;
	}
};
