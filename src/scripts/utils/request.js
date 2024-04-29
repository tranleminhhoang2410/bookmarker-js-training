import 'dotenv/config';

export const request = async (url, method, data, isJson = true) => {
	const headers = {};
	if (isJson) {
		headers['Content-Type'] = 'application/json';
		data = JSON.stringify(data);
	}

	const response = await fetch(url, {
		method,
		headers,
		body: data
	});

	if (response.ok) {
		return response.json();
	} else {
		throw new Error('Error while sending request: ' + (await response.text()));
	}
};
