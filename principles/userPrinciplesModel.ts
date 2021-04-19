import db from "../database/dbConfig"

module.exports = {
  find,
};

function find(id: Number) {
  return db("principles")
    .select('principles.id','principles.user_id', 'principles.problem', 'principles.diagnosis', 'principles.change')
    .where({user_id: id})
}