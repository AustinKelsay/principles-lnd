import { Request, Response } from 'express';
import nodeManager from './nodeManager';
const Nodes = require('./lightningModel')
const router = require("express").Router();

/**
 * POST /lnd/connect
 */
// export const connect = async (req: Request, res: Response) => {
//   const { host, cert, macaroon } = req.body;
//   const { token, pubkey } = await nodeManager.connect(host, cert, macaroon);
//   await db.addNode({ host, cert, macaroon, token, pubkey });
//   res.send({ token });
// };

  router.get("/", (req: Request, res: Response) => {
    Nodes.getAllNodes()
    .then((nodes: any) => {
      res.status(200).json(nodes)
    })
    .catch((err: any) => {
      res.status(500).json(err)
    })
  })
  
module.exports = router