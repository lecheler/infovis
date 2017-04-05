var QueryFile = require('pg-promise').QueryFile; // http://vitaly-t.github.io/pg-promise/QueryFile.html
var path = require('path');

// Helper for linking to external query files:
function sql(file) {
  var fullPath = path.join(__dirname, file); // generating full path;
  return new QueryFile(fullPath, {minify: true});
}

module.exports = {
  students: {
    gradebook: sql('sql/students/gradebook.sql'),
  },
  users: {
  	add: sql('sql/users/add.sql'),
    logActivity: sql('sql/users/logActivity.sql'),
  },
  responses: {
    add: sql('sql/responses/add.sql'),
  },
  answers: {
    add: sql('sql/answers/add.sql'),
  },
};
