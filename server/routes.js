module.exports = function(app){
	// API Testing
	const pgp = require('pg-promise')();
	const cn = {
	  host: process.env.DB_HOST,
	  port: process.env.DB_PORT,
	  database: process.env.DB_NAME,
	  user: process.env.DB_USER,
	  password: process.env.DB_PASSWORD,
	  ssl: true
	};
	const db = pgp(cn);	// https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example


	app.get('/api/ping', (req, res) => {
		res.send('pong!!!');
	});

	const students = require('./sql').students;
	const users = require('./sql').users;
	const responses = require('./sql').responses;

	app.get('/api/students', (req, res) => {
	  db.any(students.gradebook, [true])
	    .then(function (data) {
	      res.json(data);
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	});

	app.post('/api/users/add', (req, res) => {
		const obj = req.body;
		db.one(users.add, [obj.email, obj.age, obj.gender, obj.education, obj.experience.stats, obj.experience.charts, obj.experience.cbm])
	    .then(function (data) {
	      res.json(data.id);
	    })
	    .catch(function (error) {
	       console.log(error);
	    });
	});

	app.post('/api/responses/add', (req, res) => {
		const obj = req.body;
		console.log(obj);
		db.one(responses.add, [obj.userId, obj.questionId, obj.answer, obj.questionTime, obj.difficulty, 
			obj.confidence, obj.experience, obj.feedbackTime, obj.changes, obj.backtracks])
	    .then(function (data) {
	      res.json(data.id);
	    })
	    .catch(function (error) {
	       console.log(error);
	    });
	});
	
	app.get('/api/users/logActivity', (req, res) => {
		const user_id = req.query.userID;
		const type = req.query.type;
		db.one(users.logActivity, [user_id, type])
	    .then(function (data) {
	      res.json(data.id);
	    })
	    .catch(function (error) {
	       console.log(error);
	    });
	});
}
