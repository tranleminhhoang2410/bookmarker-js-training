export const FORM_VALIDATION = {
	RULES: {
		IMAGE_FORMATS: (format) => `image/${format}`
	},
	MESSAGES: {
		REQUIRED: (field) => `${field} is required`,
		INVALID_PUBLISH_DATE: 'Publish date cannot be in the future'
	}
};
