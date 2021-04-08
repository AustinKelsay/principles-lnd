"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require("../database/dbConfig");
module.exports = {
    getAllNodes: getAllNodes,
    addNode: addNode,
    updateNode: updateNode,
    removeNode: removeNode
};
function getAllNodes() {
    return db('users')
        .select("users.pubkey", "users.host", "users.cert", "users.macaroon");
}
function addNode(id, node) {
    return db("users")
        .where({ id: id })
        .update({
        host: node.host,
        cert: node.cert,
        macaroon: node.macaroon,
        pubkey: node.pubkey
    });
}
function updateNode(id, node) {
    return db("users")
        .where({ id: id })
        .update({
        host: node.host,
        cert: node.cert,
        macaroon: node.macaroon,
        pubkey: node.pubkey
    });
}
function removeNode(id) {
    return db('users')
        .where({ id: id })
        .update({
        host: '',
        cert: '',
        macaroon: '',
        pubkey: ''
    });
}
