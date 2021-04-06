"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nodes = require('./lightningModel');
var router = require("express").Router();
router.post('/connection', function (req, res) {
});
// Update a node for a user
router.put("/:id", function (req, res) {
    if (req.body.host && req.body.cert && req.body.macaroon && req.body.pubkey) {
        Nodes.updateNode(req.params.id, req.body)
            .then(function (r) {
            res.status(200).json(r);
        })
            .catch(function (err) {
            res.status(500).json(err);
        });
    }
});
// Remove a node from a user
router.delete("/:id", function (req, res) {
    if (req.params.id) {
        Nodes.removeNode(req.params.id)
            .then(function (r) {
            res.status(200).json(r);
        })
            .catch(function (err) {
            res.status(500).json(err);
        });
    }
});
// Add a node to user
router.post("/:id", function (req, res) {
    if (req.body.host && req.body.cert && req.body.macaroon && req.body.pubkey) {
        Nodes.addNode(req.params.id, req.body)
            .then(function (nodes) {
            res.status(200).json(nodes);
        })
            .catch(function (err) {
            res.status(500).json(err);
        });
    }
    else {
        res.status(500).json("Either host, cert, macaroon, or pubkey is missing");
    }
});
module.exports = router;
