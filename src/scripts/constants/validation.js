export const VALIDATION = {
	MESSAGE: {
		IS_REQUIRED: (field) => `${field} cannot be empty!`,
		MAX_LENGTH: (field, length) => `${field} cannot have more than ${length} characters!`,
		IS_FUTURE_DATE: (field) => `${field} cannot be in the future!`,
		IS_VALID_FORMAT: (field, extension) => `${field} cannot be in ${extension} extension!`
	}
};
