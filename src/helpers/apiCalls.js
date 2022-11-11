import { API_KEY } from "./variables";

const postData = async (url, data = {}) => {
	const response = await fetch(url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

export const checkData = async (value, type, id) => {
	// guest session id could be stored in local storage for future use as docs mention that each device should contain one guest session/device. (not implemented)
	try {
		await fetch(
			`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`
		)
			.then((data) => data.json())
			.then((data) => {
				return postData(
					`https://api.themoviedb.org/3/${type}/${id}/rating?api_key=${API_KEY}&guest_session_id=${data.guest_session_id}`,
					{ value: value }
				).then((data) => {
					console.log(data);
				});
			});
	} catch (e) {
		console.log(e);
	}
};
