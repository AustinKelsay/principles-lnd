"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router();
var userPrinciples = require("./userPrinciplesModel");
var authenticate = require('../users/middleware/authenticateMiddleware');
var authenticateSpecificUser = require("../users/middleware/authenticateSpecifcUserMiddleware");
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
router.post("/", authenticate, function (req, res) {
    userPrinciples.add(req.body)
        .then(function (principles) {
        res.status(201).json(principles);
    })
        .catch(function (error) {
        res.status(500).json(error.message);
    });
});
router.delete("/:id", authenticateSpecificUser, function (req, res) {
    var id = req.params.id;
    userPrinciples.remove(id)
        .then(function (principles) {
        if (!principles) {
            res.status(404).json({
                message: "The principle with the specified ID does not exist.",
            });
        }
        else {
            res.status(200).json(principles);
        }
    })
        .catch(function (error) {
        console.log("Error: ", error);
        res.status(500).json({ errorMessage: "The principle could not be removed" });
    });
});
router.put("/:id", authenticateSpecificUser, function (req, res) {
    userPrinciples.update(req.params.id, req.body)
        .then(function (principles) {
        if (principles) {
            res.status(200).json(principles);
        }
        else {
            res.status(404).json({ message: "There was an issue completing this request" });
        }
    })
        .catch(function (error) {
        console.log("Error:", error);
        res.status(500).json({
            message: "Error updating the principle",
        });
    });
});
module.exports = router;
