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
    console.log(data.score);
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
    let value = 0;

    switch (a.type) {
      case 'array':
        let final = 0 ;
        for (let i=0; i<data.answer.length; i++) {
          const v = a.answer.indexOf(data.answer[i]);
          if (v > -1) {
            final++;
          } else {
            final--;
          }
        }
        value = final/a.answer.length;
        break;
      case 'numeric':
        value = data.answer/a.answer;
        break;
    }
    return value;
  }
}

export default Api;