export const showToast = (toastSelector, toastTemplate, displayTime) => {
	toastSelector.innerHTML = toastTemplate;

	setTimeout(() => {
		toastSelector.remove();
	}, displayTime);
};
