const router = require("express").Router();
import express, {Request, Response} from "express"
const userPrinciples = require("./userPrinciplesModel");
const authenticate = require('../users/authenticateUserMiddleware');


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


router.post("/", authenticate, (req: Request, res: Response) => {
    userPrinciples.add(req.body)
        .then((principles: any) => {
            res.status(201).json(principles);
        })
        .catch((error: Error) => {
            res.status(500).json(error.message);
        });
});


router.delete("/:id", authenticate, (req: Request, res: Response) => {
    const { id } = req.params;
    userPrinciples.remove(id)
    .then((principles: any) => {
        if (!principles) {
          res.status(404).json({
            message: "The principle with the specified ID does not exist.",
          });
        } else {
          res.status(200).json(principles);
        }
      })
      .catch((error: Error) => {
        console.log("Error: ", error);
        res.status(500).json({ errorMessage: "The principle could not be removed" });
      });
  });

  router.put("/:id", authenticate, (req: Request, res: Response) => {
    userPrinciples.update(req.params.id, req.body)
      .then((principles: any) => {
        if (principles) {
          res.status(200).json(principles);
        } else {
          res.status(404).json({ message: "There was an issue completing this request" });
        }
      })
      .catch((error: Error) => {
        console.log("Error:", error);
        res.status(500).json({
          message: "Error updating the principle",
        });
      });
  });

module.exports = router;