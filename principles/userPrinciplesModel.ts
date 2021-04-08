const database = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  update,
  remove
};

function find(id: Number) {
  return database("principles")
    .select('principles.id','principles.user_id', 'principles.problem', 'principles.diagnosis', 'principles.change')
    .where({user_id: id})
    
}

function findBy(filter: any) {
  return database("principles").where(filter).first();
}

async function add(principle: any) {
    return database("principles")
    .insert(principle, "id")
    .then((id: Number) => {
        return findBy(id);
    });
}

function update(id: Number, changes: any) {
    return database('principles')
      .where({ id })
      .update(changes, '*');
  }

function remove(id: Number) { 
    return database('principles')
    .where('id', Number(id))
    .del();
}