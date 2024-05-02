import { REQUEST } from '../constants';

export const request = async (url, method, data) => {
	const options = {
		method,
		headers: {},
		body: null
	};

	if (method !== 'GET') {
		if (data instanceof FormData) {
			options.body = data;
		} else {
			options.body = JSON.stringify(data);
			options.headers['Content-Type'] = REQUEST.CONTENT_TYPE.APPLICATION_JSON;
		}
	}

	const response = await fetch(url, options);

	if (response.ok) {
		return response.json();
	} else {
		throw new Error(REQUEST.ERROR_SENDING);
	}
};
