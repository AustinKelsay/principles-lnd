import { Request, Response } from 'express';
import nodeManager from './nodeManager';
const Nodes = require('./lightningModel')
const router = require("express").Router();

export interface LndNode {
  host: string;
  cert: string;
  macaroon: string;
  pubkey: string;
}

router.post('/connection', (req: Request, res: Response) => {

})

// Update a node for a user
router.put("/", (req: Request, res: Response) => {
  if (req.body.host && req.body.cert && req.body.macaroon && req.body.pubkey) {
    Nodes.updateNode(req.params.id, req.body)
    .then((r: any) => {
      res.status(200).json(r)
    })
    .catch((err: any) => {
      res.status(500).json(err)
    })
  }
})

// Remove a node from a user
router.delete("/", (req: Request, res: Response) => {
  if (req.params.id) {
    Nodes.removeNode(req.params.id)
    .then((r: any) => {
      res.status(200).json(r)
    })
    .catch((err: any) => {
      res.status(500).json(err)
    })
  }
})

// Add a node to user
router.post("/", (req: Request, res: Response) => {
  if (req.body.host && req.body.cert && req.body.macaroon && req.body.pubkey) {
    Nodes.addNode(req.params.id, req.body)
    .then((nodes: any) => {
      res.status(200).json(nodes)
    })
    .catch((err: any) => {
      res.status(500).json(err)
    })
  }
})
  
module.exports = router