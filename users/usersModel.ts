const db = require("../database/dbConfig");

export interface User {
    username: String,
    password: String
  }

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(username: any) {
  return db("users").where(username).first();
}

async function add(user: User) {
  const [id] = await db("users").insert(user, 'id');

  return findById(id);
}

function findById(id: number) {
  return db("users").where({ id }).first();
}