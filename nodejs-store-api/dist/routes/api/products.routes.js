"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_handler_1 = require("../../handlers/products.handler");
const authentication_middleware_1 = __importDefault(require("../../middlewares/authentication.middleware"));
// Create Instance Router
const productRoutes = express_1.default.Router();
// Add Product Routes to /api/products
productRoutes.get('/', products_handler_1.getProducts);
productRoutes.get('/:id', products_handler_1.getProduct);
productRoutes.patch('/:id', products_handler_1.updateProduct);
productRoutes.delete('/:id', products_handler_1.destroyProduct);
productRoutes.post('/', authentication_middleware_1.default, products_handler_1.createProduct);
productRoutes.get('/category/:category', products_handler_1.getProdbyCat);
exports.default = productRoutes;
