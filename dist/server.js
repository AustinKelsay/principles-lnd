"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// const authRouter = require("./users/auth-router")
// const principlesRouter = require("./principles/principles-router")
// const userPrinciplesRouter = require("./principles/user-principles-router")
var lightningRouter = require("./lightning/lightningRouter");
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
var server = express_1.default();
server.use(express_1.default.json());
server.use(cors_1.default());
server.use(helmet_1.default());
server.use(morgan_1.default('tiny'));
server.get("/", function (req, res) {
    console.log(process.env.PORT);
    res.status(200).json({ message: "Welcome!" });
});
// server.use('/auth', authRouter);
// server.use('/principles', principlesRouter);
// server.use('/principles/user', userPrinciplesRouter);
server.use("/lnd/:id", lightningRouter);
exports.default = server;
