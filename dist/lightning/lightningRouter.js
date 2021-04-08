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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodeManager_1 = __importDefault(require("./nodeManager"));
var Nodes = require('./lightningModel');
var router = require("express").Router();
var authenticateAdmin = require("../users/authenticateAdminMiddleware").authenticateAdmin;
router.get('/', function (req, res) {
    Nodes.getAllNodes()
        .then(function (nodes) {
        res.status(200).json(nodes);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
// Update a node for a user
router.put("/:id", function (req, res) {
    if (req.body.host && req.body.cert && req.body.macaroon && req.body.pubkey) {
        Nodes.updateNode(req.params.id, req.body)
            .then(function (r) {
            res.status(200).json(r);
        })
            .catch(function (err) {
            res.status(500).json(err);
        });
    }
});
// Remove a node from a user
router.delete("/:id", function (req, res) {
    if (req.params.id) {
        Nodes.removeNode(req.params.id)
            .then(function (r) {
            res.status(200).json(r);
        })
            .catch(function (err) {
            res.status(500).json(err);
        });
    }
});
// Add a node to user
router.post("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pubkey, newNode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.body.host && req.body.cert && req.body.macaroon)) return [3 /*break*/, 2];
                return [4 /*yield*/, nodeManager_1.default.connect(req.body.host, req.body.cert, req.body.macaroon)];
            case 1:
                pubkey = (_a.sent()).pubkey;
                newNode = { pubkey: pubkey, host: req.body.host, cert: req.body.cert, macaroon: req.body.macaroon };
                Nodes.addNode(req.params.id, newNode)
                    .then(function (nodes) {
                    res.status(200).json(nodes);
                })
                    .catch(function (err) {
                    res.status(500).json(err);
                });
                return [3 /*break*/, 3];
            case 2:
                res.status(500).json("Either host, cert, macaroon, or pubkey is missing");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
