"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex = require("knex");
require('dotenv').config();
var config = require("../knexfile");
var env = process.env.DB_ENV || "development";
var db = knex(config[env]);
exports.default = db;
