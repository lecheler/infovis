import axios from 'axios';

const api = axios.create({
	baseURL: '../api/',
});

function ping() {
	return api.get('ping/');
}

function students() {
  return api.get('students/');
}

function addUser(email) {
  return api.get('users/add?email=' + email);
}

const Api = {
	ping() {
		return ping().then(response =>
			response.data
		).catch((err) => {
			console.log(err);
		});
	},
  
  students() {
    return students().then(response =>
      response.data
    ).catch((err) => {
      console.log(err);
    });
  },

  addUser(email) {
    return addUser(email).then(response =>
      response.data
    ).catch((err) => {
      console.log(err);
    });
  }
}

export default Api;