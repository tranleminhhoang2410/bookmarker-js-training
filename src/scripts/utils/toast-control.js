import { TOAST } from '../constants';

export const hideToast = (toastContainer) => {
	toastContainer.remove();
};

export const showToast = (toastContainer, toastTemplate, displayTime) => {
	// eslint-disable-next-line no-param-reassign
	toastContainer.innerHTML = toastTemplate;

	// Get the close button
	const closeButton = toastContainer.querySelector(`#${TOAST.CLOSE_BUTTON_ID}`);

	// Hide the toast when clicking on close button
	if (closeButton) {
		closeButton.addEventListener('click', () => {
			hideToast(toastContainer);
		});
	}

	// Automatically hide the toast after a certain time
	setTimeout(() => {
		hideToast(toastContainer);
	}, displayTime);
};
