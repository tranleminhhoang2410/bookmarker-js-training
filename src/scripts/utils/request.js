import 'dotenv/config';

export const request = async (path, method, data) => {
	const url = `${process.env.BASE_API_URL}/${path}`;
	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (response.ok) {
		return {
			data: response.json(),
			totalCount: response.headers.get('X-Total-Count')
		};
	} else {
		throw new Error('Error while sending request');
	}
};
