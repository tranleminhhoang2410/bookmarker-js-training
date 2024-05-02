export const showModal = (modalContainer, modalContent) => {
	modalContainer.innerHTML = modalContent;
};

export const hideModal = (modalContainer) => {
	modalContainer.remove();
};
