export const toastMessageTemplate = (message, description) => {
	return `
    <div class="toast-container">
			<h2 class="toast-message">${message}</h2>
			<p class="toast-description">${description}</p>
		</div>
  `;
};
