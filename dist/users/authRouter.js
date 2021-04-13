"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var authenticateAdmin = require('./middleware/authenticateAdminMiddleware');
var Users = require("../users/usersModel");
router.post('/register', function (req, res) {
    console.log(req.body);
    var hash = bcrypt.hashSync(req.body.password, 14);
    req.body.password = hash;
    Users.add(req.body)
        .then(function (user) {
        res.status(200).json({ data: user });
    })
        .catch(function (err) {
        res.status(500).json({ error: err });
    });
});
router.post('/login', function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    console.log('here');
    Users.findBy({ username: username })
        .then(function (user) {
        console.log(user);
        if (user && bcrypt.compareSync(password, user.password)) {
            var token = generateToken(user);
            res.status(200).json({ message: "Welcome " + user.username + "!", token: token, user: user });
        }
        else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    })
        .catch(function (err) {
        console.log(err);
        res.status(500).json({ error: err });
    });
});
router.get('/users', authenticateAdmin, function (req, res) {
    Users.find()
        .then(function (users) {
        res.status(200).json(users);
    })
        .catch(function (err) {
        res.status(400).json(err);
    });
});
function generateToken(user) {
    var payload = {
        id: user.id,
        username: user.username,
        admin: user.admin
    };
    var secret = process.env.JWT_SECRET || "Satoshi Nakamoto";
    var options = {
        expiresIn: "1d",
    };
    return jwt.sign(payload, secret, options);
}
module.exports = router;
