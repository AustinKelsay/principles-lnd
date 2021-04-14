const router = require("express").Router();
import express, {Request, Response} from "express"
const userPrinciples = require("./userPrinciplesModel");
const authenticate = require('../users/middleware/authenticateMiddleware');


router.get("/:id", authenticate, (req: Request, res: Response) => {
    userPrinciples.find(req.params.id)
      .then((principles: any) => {
        res.status(200).json(principles);
      })
      .catch((err: Error) => {
          console.log(err)
          res.status(400).json({message: err})
      });
});


module.exports = router;