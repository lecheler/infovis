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
		res.send('pong!');
	});

	const students = require('./sql').students;
	const users = require('./sql').users;

	app.get('/api/students', (req, res) => {
	  db.any(students.gradebook, [true])
	    .then(function (data) {
	      res.json(data);
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	});

	app.get('/api/users/add', (req, res) => {
		console.log(users.add);
		const email = req.query.email;
		db.one(users.add, [email])
	    .then(function (data) {
	    //	console.log(data);
	      res.json(data);
	    })
	    .catch(function (error) {
	       console.log(error);
	    });
	});
}
