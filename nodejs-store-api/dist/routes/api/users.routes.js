"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_handler_1 = require("../../handlers/users.handler");
const authentication_middleware_1 = __importDefault(require("../../middlewares/authentication.middleware"));
// Create Instance Router
const userRoutes = express_1.default.Router();
// Add User Routes to /api/users
userRoutes.get('/', authentication_middleware_1.default, users_handler_1.getUsers);
userRoutes.post('/authenticate', users_handler_1.authenticate);
userRoutes.get('/:id', authentication_middleware_1.default, users_handler_1.getUser);
userRoutes.post('/', authentication_middleware_1.default, users_handler_1.createUser);
userRoutes.patch('/:id', authentication_middleware_1.default, users_handler_1.updateUser);
userRoutes.delete('/:id', authentication_middleware_1.default, users_handler_1.destroyUser);
exports.default = userRoutes;
