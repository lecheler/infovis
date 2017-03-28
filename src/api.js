import axios from 'axios';

import questionData from './components/questions/questionData';

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
    data.score = this.getScore(data);

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
  },

  getScore(data) {

    const a = questionData.answers[data.questionId-1];

    if (a.type === 'array') {
      let final = 0 ;
      for (let i=0; i<data.answer.length; i++) {
        const v = a.answer.indexOf(data.answer[i]);
        if (v > -1) {
          final++;
        } else {
          final--;
        }
      }
      return final/a.answer.length;
    }

    return true;
  }
}

export default Api;