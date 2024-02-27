import { BASE_URL } from "../constants/base-url";

export const request = async (path, method, data) => {
    const url = `${BASE_URL}/${path}`;
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error while sending request");
    }
};