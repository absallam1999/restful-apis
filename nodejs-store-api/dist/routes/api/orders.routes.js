"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_handler_1 = require("../../handlers/orders.handler");
const authentication_middleware_1 = __importDefault(require("../../middlewares/authentication.middleware"));
// Create Instance Router
const orderRoutes = express_1.default.Router();
// Add Order Routes to /api/orders
orderRoutes.get('/:id', authentication_middleware_1.default, orders_handler_1.currentOrders);
orderRoutes.post('/:id/product', authentication_middleware_1.default, orders_handler_1.addProduct);
orderRoutes.get('/:id/status', authentication_middleware_1.default, orders_handler_1.completedOrders);
exports.default = orderRoutes;
