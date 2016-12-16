import axios from 'axios';

const api = axios.create({
	baseURL: '../api/',
});

function ping() {
	return api.get('ping/');
}

const Api = {
	ping() {
		return ping().then(response =>
			response.data
		).catch((err) => {
			console.log(err);
		});
	}
}

export default Api;