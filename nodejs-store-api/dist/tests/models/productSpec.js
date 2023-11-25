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
const product_model_1 = require("../../models/product.model");
const index_database_1 = __importDefault(require("../../database/index.database"));
const productStore = new product_model_1.ProductStore();
describe('Product Models Test', () => {
    describe('Test if Methods Exist', () => {
        it('Should Have a Create Product method', () => {
            expect(productStore.createProduct).toBeDefined();
        });
        it('Should Have a Get Product method', () => {
            expect(productStore.getProduct).toBeDefined();
        });
        it('Should Have a Get Products method', () => {
            expect(productStore.getProducts).toBeDefined();
        });
        it('Should Have a Update Product method', () => {
            expect(productStore.updateProduct).toBeDefined();
        });
        it('Should Have a delete Product method', () => {
            expect(productStore.deleteProduct).toBeDefined();
        });
    });
    describe('Test Product Model Logic', () => {
        const prod = {
            name: 'First Product',
            price: 500,
            category: 'Product',
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createdProd = yield productStore.createProduct(prod);
            prod.id = createdProd.id;
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield index_database_1.default.connect();
            const sql = 'DELETE FROM products';
            yield conn.query(sql);
            conn.release();
        }));
        it('Create method Should Return New Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdProd = yield productStore.createProduct({
                name: 'Second Product',
                price: 1000,
                category: 'product',
            });
            expect(createdProd).toEqual({
                id: createdProd.id,
                name: 'Second Product',
                price: 1000,
                category: 'product',
            });
        }));
        it('GetProducts Method Should Return all Products', () => __awaiter(void 0, void 0, void 0, function* () {
            const prods = yield productStore.getProducts();
            expect(prods.length).toEqual(prods.length);
        }));
        it('GetProduct Method Should Return one Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnedProd = yield productStore.getProduct(prod.id);
            expect(returnedProd.id).toBe(prod.id);
            expect(returnedProd.name).toBe(prod.name);
            expect(returnedProd.price).toBe(prod.price);
            expect(returnedProd.category).toBe(prod.category);
        }));
        it('Update Method Should Return Updated Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedProd = yield productStore.updateProduct(Object.assign(Object.assign({}, prod), { name: 'updated Product Name' }));
            expect(updatedProd.id).toBe(prod.id);
            expect(updatedProd.name).toBe('updated Product Name');
            expect(updatedProd.price).toBe(prod.price);
            expect(updatedProd.category).toBe(prod.category);
        }));
        it('Delete Method Should Delete Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedProd = yield productStore.deleteProduct(prod.id);
            expect(deletedProd.id).toBe(prod.id);
        }));
    });
});
