import { Request, Response } from 'express';
import nodeManager from './nodeManager';
const Nodes = require('./lightningModel')
const router = require("express").Router();

router.post('/connection', (req: Request, res: Response) => {

})

// Add a node to user
router.post("/", (req: Request, res: Response) => {
  if (req.body.host && req.body.cert && req.body.macaroon && req.body.pubkey) {
    Nodes.addNode(req.body)
    .then((nodes: any) => {
      res.status(200).json(nodes)
    })
    .catch((err: any) => {
      res.status(500).json(err)
    })
  }
})
  
module.exports = router