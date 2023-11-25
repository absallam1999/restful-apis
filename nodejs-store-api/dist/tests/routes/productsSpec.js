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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const productStore = new product_model_1.ProductStore();
const request = (0, supertest_1.default)(index_1.default);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjo2LCJ1c2VyX25hbWUiOiJBaG1lZDIwIiwiZmlyc3RfbmFtZSI6IkFobWVkIiwibGFzdF9uYW1lIjoiYmFkciIsImVtYWlsIjoidGVzdDIwQHRlc3QuY29tIn0sImlhdCI6MTY2ODQ0MTc5OH0.0Qmf47wb3sXM5t7M8A7BIU9i6yGv3FI1Qq6L5ovG1ds';
describe('Product API Endpoints', () => __awaiter(void 0, void 0, void 0, function* () {
    const prod = {
        name: 'First Product',
        price: 1000,
        category: 'Product',
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createdProduct = yield productStore.createProduct(prod);
        prod.id = createdProduct.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield index_database_1.default.connect();
        const sql = 'DELETE FROM products';
        yield conn.query(sql);
        conn.release();
    }));
    describe('Test Products CRUD APIs Methods', () => {
        it('Should Create Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post('/api/products/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                name: 'Second Product',
                price: 1000,
                category: 'Product',
            });
            expect(response.status).toBe(200);
            const { name, price, category } = response.body.prod;
            expect(name).toBe('Second Product');
            expect(price).toBe(1000);
            expect(category).toBe('Product');
        }));
        it('Should Get Products', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/api/products/')
                .set('Content-type', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body.products).toBe(response.body.products);
        }));
        it('Should Get Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get(`/api/products/${prod.id}`)
                .set('Content-type', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body.product.name).toBe('First Product');
            expect(response.body.product.price).toBe(1000);
        }));
        it('Should Update Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .patch(`/api/products/${prod.id}`)
                .set('Content-type', 'application/json')
                .send(Object.assign(Object.assign({}, prod), { name: 'New Product' }));
            expect(response.status).toBe(200);
            const { id, name, price, category } = response.body.prod;
            expect(id).toBe(prod.id);
            expect(name).toBe('New Product');
            expect(price).toBe(prod.price);
            expect(category).toBe(prod.category);
        }));
        it('Should Delete Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .delete(`/api/products/${prod.id}`)
                .set('Content-type', 'application/json');
            expect(response.status).toBe(200);
            expect(response.body.prod.id).toBe(prod.id);
            expect(response.body.prod.name).toBe('New Product');
        }));
    });
}));
