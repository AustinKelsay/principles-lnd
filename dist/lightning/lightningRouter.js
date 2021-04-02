"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upvotePost = exports.connect = void 0;
const nodeManager_1 = __importDefault(require("./nodeManager"));
const dbConfig_js_1 = __importDefault(require("../database/dbConfig.js"));
/**
 * POST /api/connect
 */
exports.connect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { host, cert, macaroon } = req.body;
    const { token, pubkey } = yield nodeManager_1.default.connect(host, cert, macaroon);
    yield dbConfig_js_1.default.addNode({ host, cert, macaroon, token, pubkey });
    res.send({ token });
});
/**
 * POST /api/posts/:id/upvote
 */
exports.upvotePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // find the post
    const post = dbConfig_js_1.default.getPostById(parseInt(id));
    if (!post)
        throw new Error('Post not found');
    dbConfig_js_1.default.upvotePost(post.id);
    res.send(post);
});
//# sourceMappingURL=lightningRouter.js.map