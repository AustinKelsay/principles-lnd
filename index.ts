import express, { Application, Request, Response } from "express"
// const authRouter = require("./users/auth-router")
// const principlesRouter = require("./principles/principles-router")
// const userPrinciplesRouter = require("./principles/user-principles-router")
// const lightningRouter = require("./lightning/lightningRouter.ts")
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from "helmet"
import morgan from "morgan"

dotenv.config()

const server: Application = express();

server.use(express.json());
server.use(cors())
server.use(helmet())
server.use(morgan())

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

server.get("/", (req: Request, res: Response) => {
    console.log(process.env.PORT)
    res.status(200).json({message: "Welcome!"})
})

// server.use('/auth', authRouter);
// server.use('/principles', principlesRouter);
// server.use('/principles/user', userPrinciplesRouter);
// server.use('/nodes', lightningRouter);