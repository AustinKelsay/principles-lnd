"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    var token = req.headers.authorization;
    var secret = process.env.JWT_SECRET || "Satoshi Nakamoto";
    if (token) {
        jwt.verify(token, secret, function (err, decodedToken) {
            console.log("inside verify");
            if (err) {
                console.log("inside if");
                res.status(401).json({ message: "Not Allowed" });
            }
            else {
                console.log("inside else");
                next();
            }
        });
    }
    else {
        res.status(401).json({ message: "No token!" });
    }
};
