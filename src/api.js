import axios from 'axios';

const api = axios.create({
	baseURL: window.location.origin + '/api/',
});

function ping() {
	return api.get('ping/');
}

function students() {
  return api.get('students/');
}

function addUser(data) {
  return api.post('users/add', data);
}

function addResponse(data) {
  return api.post('responses/add', data);
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

  addUser(data) {
    return addUser(data).then(response =>
      response.data
    ).catch((err) => {
      console.log(err);
    });
  },

  addResponse(data) {
    return addResponse(data).then(response =>
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