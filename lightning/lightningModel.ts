import { LndNode } from "./nodeManager";
const db = require("../database/dbConfig");

module.exports = {
    getAllNodes,
    // getNodeByPubkey,
    // getNodeByToken,
    // addNode
}

function getAllNodes() {
    return db('nodes')
}

// function getNodeByPubkey(pubkey: string) {
//     return getAllNodes().find(node => node.pubkey === pubkey);
// }

// function getNodeByToken(token: string) {
//     return getAllNodes().find(node => node.token === token);
// }

// function addNode(node: LndNode) {
//     return db("nodes").insert(node).then((n) => {
//         db('nodes').filter(n => n.host !== node.host)
//     })
// }