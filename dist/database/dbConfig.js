"use strict";
var knex = require("knex");
require('dotenv').config();
var config = require("../knexfile");
var env = process.env.DB_ENV || "development";
module.exports = knex(config[env]);
