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
	const db = pgp(cn);

	app.get('/api/testGet', (req, res) => {
	  db.any("select * from test_table", [true])
	    .then(function (data) {
	      res.json(data);
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	});

	app.get('/api/testPost', (req, res) => {
	  const test = req.query.test;
	  console.log(test);
	  db.none("insert into test_table(stuff) values($1)", [test])
	    .then(function () {
	        // success;
	    })
	    .catch(function (error) {
	        // error;
	    });
	});

  //other routes..
}