import db from "../database/dbConfig"

module.exports = {
  addPrinciple,
  findPrinciples,
  findById,
  updatePrinciple,
  removePrinciple
};

function findPrinciples() {
  return db("principles");
}

function findById(id: Number) {
  return db("principles").where({ id }).first();
}

async function addPrinciple(principle: any) {
    return db("principles").insert(principle, "id")
}

function updatePrinciple(id: Number, changes: any) {
    return db('principles')
      .where({ id })
      .update(changes, '*');
  }

function removePrinciple(id: Number) { 
    return db('principles')
    .where('id', Number(id))
    .del();
}