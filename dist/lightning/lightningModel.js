"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig_1 = __importDefault(require("../database/dbConfig"));
module.exports = {
    getAllNodes: getAllNodes,
    addNode: addNode,
    updateNode: updateNode,
    removeNode: removeNode
};
function getAllNodes() {
    return dbConfig_1.default('users')
        .select("users.pubkey", "users.host", "users.cert", "users.macaroon");
}
function addNode(id, node) {
    return dbConfig_1.default("users")
        .where({ id: id })
        .update({
        host: node.host,
        cert: node.cert,
        macaroon: node.macaroon,
        pubkey: node.pubkey
    });
}
function updateNode(id, node) {
    return dbConfig_1.default("users")
        .where({ id: id })
        .update({
        host: node.host,
        cert: node.cert,
        macaroon: node.macaroon,
        pubkey: node.pubkey
    });
}
function removeNode(id) {
    return dbConfig_1.default('users')
        .where({ id: id })
        .update({
        host: '',
        cert: '',
        macaroon: '',
        pubkey: ''
    });
}
