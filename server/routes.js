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

	app.get('/api/students', (req, res) => {
	  db.any(students.gradebook, [true])
	    .then(function (data) {
	      res.json(data);
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	});

	// app.get('/api/testPost', (req, res) => {
	//   const test = req.query.test;
	//   console.log(test);
	//   db.one("insert into test_table(stuff, created_at) values($1, now()) returning id, created_at", [test])
	//     .then(function(data) {
	//     	console.log(data);
	//     	res.json(data);
	//     })
	//     .catch(function (error) {
	//        console.log(error);
	//     });
	// });

  //other routes..
}

/*

with tasks as (select * from grades left join assignments on assignments.id = grades.assignment_id)
  select first_name, last_name, tasks.name, score/total*100 as score from students left join tasks on tasks.student_id = students.id;

*/