"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.NodeEvents = void 0;
var lnrpc_1 = __importDefault(require("@radar/lnrpc"));
var events_1 = require("events");
exports.NodeEvents = {
    invoicePaid: 'invoice-paid',
};
var NodeManager = /** @class */ (function (_super) {
    __extends(NodeManager, _super);
    function NodeManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Tests the LND node connection by validating that we can get the node's info
     */
    NodeManager.prototype.connect = function (host, cert, macaroon) {
        return __awaiter(this, void 0, void 0, function () {
            var rpc, pubkey, msg, signature, rHash, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, lnrpc_1.default({
                                server: host,
                                cert: Buffer.from(cert, 'hex').toString('utf-8'),
                                macaroon: macaroon,
                            })];
                    case 1:
                        rpc = _a.sent();
                        return [4 /*yield*/, rpc.getInfo()];
                    case 2:
                        pubkey = (_a.sent()).identityPubkey;
                        // verify we have permission to get channel balances
                        return [4 /*yield*/, rpc.channelBalance()];
                    case 3:
                        // verify we have permission to get channel balances
                        _a.sent();
                        msg = Buffer.from('authorization test').toString('base64');
                        return [4 /*yield*/, rpc.signMessage({ msg: msg })];
                    case 4:
                        signature = (_a.sent()).signature;
                        // verify we have permission to verify a message
                        return [4 /*yield*/, rpc.verifyMessage({ msg: msg, signature: signature })];
                    case 5:
                        // verify we have permission to verify a message
                        _a.sent();
                        return [4 /*yield*/, rpc.addInvoice({ value: '1' })];
                    case 6:
                        rHash = (_a.sent()).rHash;
                        // verify we have permission to lookup invoices
                        return [4 /*yield*/, rpc.lookupInvoice({ rHash: rHash })];
                    case 7:
                        // verify we have permission to lookup invoices
                        _a.sent();
                        // listen for payments from LND
                        this.listenForPayments(rpc, pubkey);
                        return [2 /*return*/, { pubkey: pubkey }];
                    case 8:
                        err_1 = _a.sent();
                        throw err_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * listen for payments made to the node. When a payment is settled, emit
     * the `invoicePaid` event to notify listeners of the NodeManager
     */
    NodeManager.prototype.listenForPayments = function (rpc, pubkey) {
        var _this = this;
        var stream = rpc.subscribeInvoices();
        stream.on('data', function (invoice) {
            if (invoice.settled) {
                var hash = invoice.rHash.toString('base64');
                var amount = invoice.amtPaidSat;
                _this.emit(exports.NodeEvents.invoicePaid, { hash: hash, amount: amount, pubkey: pubkey });
            }
        });
    };
    return NodeManager;
}(events_1.EventEmitter));
exports.default = new NodeManager();
