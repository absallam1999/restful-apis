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
exports.OrderStore = void 0;
const index_database_1 = __importDefault(require("../database/index.database"));
class OrderStore {
    // Current Order
    CurrentOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'SELECT * FROM users INNER JOIN orders ON $1 = orders.user_id';
                // Run SQL Query
                const result = yield conn.query(sql, [id]);
                // Release Connection
                conn.release();
                // Retrun Currrent order
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error Get Order ${id}, Error: ${err}`);
            }
        });
    }
    // Add Product to order
    addProduct(OP) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'INSERT INTO order_products (quantity, order_id, prod_id) VALUES($1, $2, $3) RETURNING *';
                // Run SQL Query
                const result = yield conn.query(sql, [
                    OP.quantity,
                    OP.order_id,
                    OP.prod_id,
                ]);
                // Release Connection
                conn.release();
                // Return added Products
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error add product ${OP.prod_id} to order ${OP.order_id}, Error: ${err}`);
            }
        });
    }
    // Completed Orders
    completedOrders(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE status=$1';
                // Run SQL Query
                const result = yield conn.query(sql, [status]);
                // Release Connection
                conn.release();
                // Return Completed Orders
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error Get Completed Orders, Error: ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
