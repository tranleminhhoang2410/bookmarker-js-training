import { FORM_VALIDATION } from '@/constants';
import { getElement } from './ui-control';

const isRequired = (value) => !!value && !!value.trim();

const validateRequired = (field, value = '') =>
	isRequired(value) ? undefined : FORM_VALIDATION.MESSAGES.REQUIRED(field);

const isValidDate = (date) => !isNaN(date.getTime());

const validatePublicationDate = (publicationDate) => {
	// Check if the date object is valid
	if (!isValidDate) {
		return undefined;
	}

	const today = new Date();

	// Check if the publication date is in the future
	if (publicationDate > today) {
		return FORM_VALIDATION.MESSAGES.INVALID_PUBLISH_DATE;
	}

	// If all checks pass, the date is valid
	return undefined;
};
const isValidImageFormat = (url) => {
	const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'q=80'];

	const urlLower = url.toLowerCase();
	return imageExtensions.some((extension) => urlLower.endsWith('.' + extension) || urlLower.endsWith('&' + extension));
};

const appendErrorMessage = (inputElement, errorMessage) => {
	const errorElement = inputElement.parentElement.lastElementChild;
	errorElement.textContent = errorMessage;
};

const removeErrorMessage = (inputElement) => {
	const errorElement = inputElement.parentElement.lastElementChild;
	errorElement.textContent = '';
};

const validateField = (fieldName, fieldValue, validateFunction, errorMessage) => {
	const inputElement = getElement('#' + fieldName);

	if (!validateFunction(fieldValue)) {
		appendErrorMessage(inputElement, errorMessage);
	} else {
		removeErrorMessage(inputElement);
	}
};

export { isValidDate, validateRequired, validatePublicationDate, isValidImageFormat };
