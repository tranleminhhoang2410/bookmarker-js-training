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
		isFutureDate: false
	},
	image: {
		isRequired: true
	},
	description: {
		isRequired: true,
		maxLength: 500
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
export const validateField = (inputElement, fieldName, value) => {
	const errorMessage = validateForm(fieldName, value);

	if (errorMessage) {
		appendErrorMessage(inputElement, errorMessage);
	} else {
		removeErrorMessage(inputElement);
	}
};

export const validateForm = (fieldName, value) => {
	const fieldRules = rules[fieldName];

	// Kiểm tra bắt buộc nhập
	if (fieldRules.isRequired && !value.trim()) {
		return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required!`;
	}

	// Kiểm tra độ dài tối đa
	if (fieldRules.maxLength && value.trim().length > fieldRules.maxLength) {
		return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at most ${
			fieldRules.maxLength
		} characters!`;
	}

	// Kiểm tra URL hình ảnh
	if (fieldName === 'imageUrl' && fieldRules.isRequired && !isValidImageUrl(value)) {
		return 'Invalid image URL!';
	}

	// Kiểm tra ngày xuất bản trong tương lai nếu có giá trị được chọn
	if (fieldName === 'publishedDate' && value && new Date(value) > new Date()) {
		return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be in the past!`;
	}

	return ''; // Trả về chuỗi rỗng nếu không có lỗi
};
