const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findById,
  update,
  remove,
  upVote
};

function find() {
  return db("principles");
}

function findById(id) {
  return db("principles").where({ id }).first();
}

async function add(principle) {
    return db("principles").insert(principle, "id")
}

function update(id, changes) {
    return db('principles')
      .where({ id })
      .update(changes, '*');
  }

function remove(id) { 
    return db('principles')
    .where('id', Number(id))
    .del();
}

function upVote(id) {
  return db('principles')
    .where({ id })
    .update({vote: vote+1})
}

