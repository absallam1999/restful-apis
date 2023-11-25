"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_routes_1 = __importDefault(require("./api/products.routes"));
const orders_routes_1 = __importDefault(require("./api/orders.routes"));
const users_routes_1 = __importDefault(require("./api/users.routes"));
const express_1 = __importDefault(require("express"));
// Create Instance Router
const routes = express_1.default.Router();
// Use User Routes to /api/users
routes.use('/users', users_routes_1.default);
routes.use('/orders', orders_routes_1.default);
routes.use('/products', products_routes_1.default);
exports.default = routes;
