const db = require("../database/dbConfig");
import {LndNode} from "./lightningRouter"

module.exports = {
    addNode,
    updateNode,
    removeNode
}

function addNode(id: number, node: LndNode) {
    return db("users")
        .where({ id })
        .update({
            host: node.host,
            cert: node.cert,
            macaroon: node.macaroon,
            pubkey: node.pubkey
        })
}

function updateNode(id: number, node: LndNode) {
    return db("users")
        .where({ id })
        .update({
            host: node.host,
            cert: node.cert,
            macaroon: node.macaroon,
            pubkey: node.pubkey
        })
}

function removeNode(id: number) {
    return db('users')
        .where({ id })
        .update({
            host: '',
            cert: '',
            macaroon: '',
            pubkey: ''
        })
}