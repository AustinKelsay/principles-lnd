"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const authRouter = require("./users/auth-router")
// const principlesRouter = require("./principles/principles-router")
// const userPrinciplesRouter = require("./principles/user-principles-router")
//const lightningRouter = require("./lightning/lightningRouter.ts")
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const server = express_1.default();
server.use(express_1.default.json());
server.use(cors_1.default());
server.use(helmet_1.default());
server.use(morgan_1.default());
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
server.get("/", (req, res) => {
    console.log(process.env.PORT);
    res.status(200).json({ message: "Welcome!" });
});
// server.use('/auth', authRouter);
// server.use('/principles', principlesRouter);
// server.use('/principles/user', userPrinciplesRouter);
//server.use('/nodes', lightningRouter);
//# sourceMappingURL=index.js.map