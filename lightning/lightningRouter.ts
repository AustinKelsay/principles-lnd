import { Request, Response } from 'express';
import nodeManager from './nodeManager';
const Nodes = require('./lightningModel')
const router = require("express").Router();

/**
 * POST /api/connect
 */
// export const connect = async (req: Request, res: Response) => {
//   const { host, cert, macaroon } = req.body;
//   const { token, pubkey } = await nodeManager.connect(host, cert, macaroon);
//   await db.addNode({ host, cert, macaroon, token, pubkey });
//   res.send({ token });
// };

// /**
//  * POST /api/posts/:id/upvote
//  */
// export const upvotePost = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   // find the post
//   const post = db.getPostById(parseInt(id));
//   if (!post) throw new Error('Post not found');

//   db.upvotePost(post.id);
//   res.send(post);
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