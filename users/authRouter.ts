const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require('./authenticate-middleware.js')
const Users = require("../users/users-model");
import express, {Request, Response} from "express"

router.post('/register', (req: Request, res: Response) => {
  console.log(req.body);
  const hash = bcrypt.hashSync(req.body.password, 14)

  req.body.password = hash;

  Users.add(req.body)
    .then((user: any) => {
      res.status(200).json({data: user})
    })
    .catch((err: Error) => {
      res.status(500).json({error: err})
    })
});

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then((user: any) => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}!`, token, user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err: Error) => {
      console.log(err);
      res.status(500).json({error: err})
    })
});

router.get('/users', authenticate, (req: Request, res: Response) => {
  Users.find()
    .then((users: any) => {
      res.status(200).json(users)
    })
    .catch((err: Error) => {
      res.status(400).json(err)
    })

})

function generateToken(user: any) {
  const payload = {
    subject: user.id,
    username: user.username,
    admin: user.admin
  };
  const secret = process.env.JWT_SECRET || "Satoshi Nakamoto";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}
module.exports = router;