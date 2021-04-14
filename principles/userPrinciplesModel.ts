const database = require("../database/dbConfig");

module.exports = {
  find,
};

function find(id: Number) {
  return database("principles")
    .select('principles.id','principles.user_id', 'principles.problem', 'principles.diagnosis', 'principles.change')
    .where({user_id: id})
}