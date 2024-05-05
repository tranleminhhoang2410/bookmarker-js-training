import { VALIDATION } from '../constants/validation';

const rules = {
	name: {
		isRequired: true,
		maxLength: 120
	},
	authors: {
		isRequired: true
	},
	publishedDate: {
		isRequired: true,
		isFutureDate: (value) => value && new Date(value) > new Date()
	},
	image: {
		isRequired: true,
		isValidImageFormat: (url) => {
			const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
			const urlLower = url.toLowerCase();
			const isValidExtension = imageExtensions.some((imageExtension) => urlLower.endsWith('.' + imageExtension));

			const extension = '.' + url.split('.').pop().split('?')[0].split('#')[0];

			return {
				isValidExtension,
				extension
			};
		}
	},
	description: {
		isRequired: true,
		maxLength: 1000
	}
};

// Show input error message
export const appendErrorMessage = (inputElement, errorMessage) => {
	const errorElement = inputElement.parentElement.lastElementChild;
	errorElement.textContent = errorMessage;
};

export const removeErrorMessage = (inputElement) => {
	const errorElement = inputElement.parentElement.lastElementChild;
	errorElement.textContent = '';
};

// Hàm validate filed cho một trường đầu vào và xử lý thông báo lỗi
export const validateField = (inputElement, fieldName, value, validateFieldName) => {
	const errorMessage = validateForm(fieldName, value, validateFieldName);

	if (errorMessage) {
		appendErrorMessage(inputElement, errorMessage);
	} else {
		removeErrorMessage(inputElement);
	}
};

export const validateForm = (fieldName, value, validateFieldName) => {
	const fieldRules = rules[fieldName];
	let errorMessage = '';

	// Check required file
	if (fieldRules.isRequired && !value.trim()) {
		errorMessage = VALIDATION.MESSAGE.IS_REQUIRED(validateFieldName);
	} else {
		// Check max-length
		if (fieldRules.maxLength && value.trim().length > fieldRules.maxLength) {
			errorMessage = VALIDATION.MESSAGE.MAX_LENGTH(validateFieldName, fieldRules.maxLength);
		}

		// Check future date
		if (fieldRules.isFutureDate && fieldRules.isFutureDate(value)) {
			errorMessage = VALIDATION.MESSAGE.IS_FUTURE_DATE(validateFieldName);
		}

		// Check valid iamge
		if (fieldRules.isValidImageFormat) {
			const validationResult = fieldRules.isValidImageFormat(value);
			if (!validationResult.isValidExtension) {
				errorMessage = VALIDATION.MESSAGE.IS_VALID_FORMAT(validateFieldName, validationResult.extension);
			}
		}
	}

	return errorMessage;
};
