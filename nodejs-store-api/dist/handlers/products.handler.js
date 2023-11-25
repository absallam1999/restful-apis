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
exports.getProdbyCat = exports.destroyProduct = exports.updateProduct = exports.getProducts = exports.getProduct = exports.createProduct = void 0;
const product_model_1 = require("../models/product.model");
// Create Instance From Product Store
const productStore = new product_model_1.ProductStore();
// Create Method Handler
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield productStore.createProduct(req.body);
        res.status(200).json({
            status: 'SUCCESS',
            prod: newProduct,
            message: 'Product Created Successfully',
        });
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.createProduct = createProduct;
// Get Method Handler
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productStore.getProduct(req.params.id);
        res.status(200).json({ product });
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.getProduct = getProduct;
// Get All Method Handler
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productStore.getProducts();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.getProducts = getProducts;
// Update Method Handler
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prod = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            id: req.params.id,
        };
        const updatedProduct = yield productStore.updateProduct(prod);
        res.status(200).json({
            status: 'SUCCESS',
            prod: updatedProduct,
            message: 'Product Updated Successfully',
        });
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.updateProduct = updateProduct;
// Delete Method Handler
const destroyProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield productStore.deleteProduct(req.params.id);
        res.status(200).json({
            status: 'SUCCESS',
            prod: deletedProduct,
            message: 'Product Deleted Successfully',
        });
    }
    catch (err) {
        throw new Error(`Error: ${err}`);
    }
});
exports.destroyProduct = destroyProduct;
// ProductByCat Handler
const getProdbyCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const products = yield productStore.productsCategory(category);
        res.status(200).json({ ProductsByCategory: `${category}`, products });
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.getProdbyCat = getProdbyCat;
