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
Object.defineProperty(exports, "__esModule", { value: true });
exports.completedOrders = exports.addProduct = exports.currentOrders = void 0;
const order_model_1 = require("../models/order.model");
// Create Instance From Order Store
const orderStore = new order_model_1.OrderStore();
// Get Current Orders Handler
const currentOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentOrders = yield orderStore.CurrentOrders(req.params.id);
        res.status(200).json({
            message: 'Current Orders By User',
            orders: currentOrders,
        });
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.currentOrders = currentOrders;
// Add Product to Order Handler
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addedProduct = yield orderStore.addProduct(req.body);
        res.status(200).json({
            status: 'SUCCESS',
            addedProduct,
            message: 'Product Added Successfully',
        });
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.addProduct = addProduct;
// Completed Orders Handler
const completedOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completedOrders = yield orderStore.completedOrders(req.params.status);
        res.status(200).json(completedOrders);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.completedOrders = completedOrders;
