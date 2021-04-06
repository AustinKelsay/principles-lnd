"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    var token = req.headers.authorization;
    var secret = process.env.JWT_SECRET || "Satoshi Nakamoto";
    if (token) {
        jwt.verify(token, secret, function (err, decodedToken) {
            if (err) {
                res.status(401).json({ message: "Eroor with your verification" });
            }
            else if (decodedToken.admin !== 1) {
                res.status(401).json({ message: "Must be an admin" });
            }
            else {
                next();
            }
        });
    }
    else {
        res.status(401).json({ message: "No token!" });
    }
};
