"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../database/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            if (token) {
                const verify = jsonwebtoken_1.default.verify(token, config_1.default.tokensecret);
                if (verify) {
                    next();
                }
                else {
                    res.status(401).json({ message: 'Error Login' });
                }
            }
            else {
                res.status(401).json({ message: 'Error Login' });
            }
        }
        else {
            res.status(401).json({ message: 'Error Login' });
        }
    }
    catch (err) {
        throw new Error(`Error: ${err}`);
    }
};
exports.default = authMiddleware;
