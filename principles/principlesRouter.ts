const router = require("express").Router();
import express, {Request, Response} from "express"
const Principles = require("./principlesModel");
const authenticate = require("../users/middleware/authenticateMiddleware");
const authenticateAdmin = require("../users/middleware/authenticateAdminMiddleware")


router.get("/", (req: Request, res: Response) => {
    Principles.findPrinciples()
      .then((principles: any) => {
        res.status(200).json(principles);
      })
      .catch((err: Error) => {
          res.status(400).json({message: err})
      });
});

router.get("/:id", authenticate, (req: Request, res: Response) => {
  Principles.findById(req.params.id)
    .then((principles: any) => {
      res.status(200).json(principles);
    })
    .catch((err: Error) => {
        res.status(400).json({message: err})
    });
});


router.post("/", authenticate, (req: Request, res: Response) => {
  console.log(req.body)
    Principles.addPrinciple(req.body)
        .then((principles: any) => {
            res.status(201).json(principles);
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message});
        });
});


router.delete("/:id", authenticateAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    Principles.removePrinciple(id)
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

  router.put("/:id", authenticateAdmin, (req: Request, res: Response) => {
    Principles.updatePrinciple(req.params.id, req.body)
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