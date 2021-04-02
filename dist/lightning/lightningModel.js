"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../database/dbConfig");
module.exports = {
    getAllNodes,
    getNodeByPubkey,
    getNodeByToken,
    addNode
};
function getAllNodes() {
    return db('nodes');
}
function getNodeByPubkey(pubkey) {
    return getAllNodes().find(node => node.pubkey === pubkey);
}
function getNodeByToken(token) {
    return getAllNodes().find(node => node.token === token);
}
function addNode(node) {
    return db("nodes").insert(node).then((n) => {
        db('nodes').filter(n => n.host !== node.host);
    });
}
//# sourceMappingURL=lightningModel.js.map