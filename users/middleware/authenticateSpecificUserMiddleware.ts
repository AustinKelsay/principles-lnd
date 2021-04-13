const jwt = require("jsonwebtoken");
import express, { Request, Response } from 'express';

module.exports = (req: Request, res: Response, next: any) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || "Satoshi Nakamoto";
    if (token) {
      jwt.verify(token, secret, (err: Error, decodedToken: any) => {
        if (err) { 
          res.status(401).json({ message: "Not Allowed" });
        } else if (decodedToken.id == req.params.id) {
          next();
        }
        else {
            res.status(401).json({ message: "You cannot preform this operation unless you are logged in as the correct user" });
        }
      });
    } else {
      res.status(401).json({ message: "No token!" });
    }
  };