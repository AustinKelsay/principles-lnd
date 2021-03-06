"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var PORT = process.env.PORT || 5000;
server_1.default.listen(PORT, function () {
    console.log("Listening on port " + PORT + "...");
});
