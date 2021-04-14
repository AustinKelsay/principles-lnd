"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router();
var userPrinciples = require("./userPrinciplesModel");
var authenticate = require('../users/middleware/authenticateMiddleware');
var authenticateSpecificUser = require("../users/middleware/authenticateSpecificUserMiddleware");
router.get("/:id", authenticate, function (req, res) {
    userPrinciples.find(req.params.id)
        .then(function (principles) {
        res.status(200).json(principles);
    })
        .catch(function (err) {
        console.log(err);
        res.status(400).json({ message: err });
    });
});
module.exports = router;
