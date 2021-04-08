import express, { Application, Request, Response } from "express"
const authRouter = require("./users/authRouter")
const principlesRouter = require("./principles/principlesRouter")
const userPrinciplesRouter = require("./principles/userPrinciplesRouter")
const lightningRouter = require("./lightning/lightningRouter")
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from "helmet"
import morgan from "morgan"

dotenv.config()

const server: Application = express();

server.use(express.json());
server.use(cors())
server.use(helmet())
server.use(morgan('tiny'))

server.get("/", (req: Request, res: Response) => {
    res.status(200).json({message: "Welcome!"})
})

server.use('/auth', authRouter);
server.use('/principles', principlesRouter);
server.use('/principles/user', userPrinciplesRouter);
server.use("/lnd", lightningRouter);

export default server;