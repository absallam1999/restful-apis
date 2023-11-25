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
exports.ProductStore = void 0;
const index_database_1 = __importDefault(require("../database/index.database"));
class ProductStore {
    // Create Method
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
                // Run SQL Query
                const result = yield conn.query(sql, [
                    product.name,
                    product.price,
                    product.category,
                ]);
                // Release Connection
                conn.release();
                // Return Created Product
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error Create Product ${product.name}, Error: ${err}`);
            }
        });
    }
    // Get Method
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'SELECT id, name, price, category FROM products WHERE id=($1)';
                // Run SQL Query
                const result = yield conn.query(sql, [id]);
                // Release Connection
                conn.release();
                // Return One Product
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error Get Product ${id}, Error: ${err}`);
            }
        });
    }
    // Get All Method
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'SELECT id, name, price, category FROM products';
                // Run SQL Query
                const result = yield conn.query(sql);
                // Release Connection
                conn.release();
                // Return All Products
                return result.rows;
            }
            catch (err) {
                throw new Error(`Error Get Products, Error: ${err}`);
            }
        });
    }
    // Update Method
    updateProduct(prod) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING id, name, price, category';
                // Run SQL Query
                const result = yield conn.query(sql, [
                    prod.name,
                    prod.price,
                    prod.category,
                    prod.id,
                ]);
                //Release Connection
                conn.release();
                //Return Updated Prod
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error Update Product ${prod.name}, Error: ${err}`);
            }
        });
    }
    // Delete Method
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'DELETE FROM products WHERE id=($1) RETURNING id, name';
                // Run SQL Query
                const result = yield conn.query(sql, [id]);
                // Release Connection
                conn.release();
                //Return Deleted Prod
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error Delete Product ${id}, Error: ${err}`);
            }
        });
    }
    //getProdbycat
    productsCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE category=($1)';
                // RUN SQL Query
                const result = yield conn.query(sql, [category]);
                // Release Connection
                conn.release();
                // Return Products
                return result.rows;
            }
            catch (err) {
                throw new Error(`Error Get ${category} Products, Error: ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
