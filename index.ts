const express = require('express');
// const authRouter = require("./users/auth-router")
// const principlesRouter = require("./principles/principles-router")
// const userPrinciplesRouter = require("./principles/user-principles-router")
// const lightningRouter = require("./lightning/lightningRouter.ts")
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require("helmet")
const morgan = require("morgan")

dotenv.config()

const server = express();

server.use(express.json());
server.use(cors())
server.use(helmet())
server.use(morgan())

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

server.get("/", (req, res) => {
    console.log(process.env.PORT)
    res.status(200).json({message: "Welcome!"})
})

// server.use('/auth', authRouter);
// server.use('/principles', principlesRouter);
// server.use('/principles/user', userPrinciplesRouter);
// server.use('/nodes', lightningRouter);