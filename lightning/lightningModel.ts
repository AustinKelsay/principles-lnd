const db = require("../database/dbConfig");

module.exports = {
    addNode,
    updateNode,
    removeNode
}

function addNode(id ,node) {
    return db("users")
        .where({ id })
        .update({
            host: node.host,
            cert: node.cert,
            macaroon: node.macaroon,
            pubkey: node.pubkey
        })
}

function updateNode(id ,node) {
    return db("users")
        .where({ id })
        .update({
            host: node.host,
            cert: node.cert,
            macaroon: node.macaroon,
            pubkey: node.pubkey
        })
}

function removeNode(id) {
    return db('users')
        .where({ id })
        .update({
            host: '',
            cert: '',
            macaroon: '',
            pubkey: ''
        })
}