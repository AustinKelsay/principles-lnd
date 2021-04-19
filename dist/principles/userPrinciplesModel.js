"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig_1 = __importDefault(require("../database/dbConfig"));
module.exports = {
    find: find,
};
function find(id) {
    return dbConfig_1.default("principles")
        .select('principles.id', 'principles.user_id', 'principles.problem', 'principles.diagnosis', 'principles.change')
        .where({ user_id: id });
}
