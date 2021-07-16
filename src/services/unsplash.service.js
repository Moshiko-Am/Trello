import axios from 'axios';

export const unsplashService = {
	loadPhotos,
};

async function loadPhotos(query) {
	const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=3G3H2YrHWdLEk7zLzjy33Ykx0eACFpe497xZ1BWXAQg`;
	const res = await axios.get(url);
	let { results } = res.data;

	results = results.map((result, idx) => {
		return {
			idx,
			id: result.id,
			urlBig: result.urls.full,
			urlSmall: result.urls.small,
		};
	});
	return results;
}
