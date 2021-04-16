"use strict";
var database = require("../database/dbConfig");
module.exports = {
    find: find,
};
function find(id) {
    return database("principles")
        .select('principles.id', 'principles.user_id', 'principles.problem', 'principles.diagnosis', 'principles.change')
        .where({ user_id: id });
}
