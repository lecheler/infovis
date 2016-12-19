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

function logActivity(userID, type) {
  return api.get('users/logActivity?userID=' + userID + '&type=' + type);
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
  },

  logActivity(userID, type) {
    return logActivity(userID, type).then(response =>
      response.data
    ).catch((err) => {
      console.log(err);
    });
  }
}

export default Api;