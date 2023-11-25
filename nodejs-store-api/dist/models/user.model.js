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
exports.UserStore = void 0;
const index_database_1 = __importDefault(require("../database/index.database"));
const config_1 = __importDefault(require("../database/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Hashing Password With BCRYPT
const hash = (password) => {
    const salt = parseInt(config_1.default.salt);
    return bcrypt_1.default.hashSync(password + config_1.default.pepper, salt);
};
class UserStore {
    // Create Method
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'INSERT INTO users (user_name, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, user_name, first_name, last_name, email';
                // Run SQL Query
                const result = yield conn.query(sql, [
                    user.user_name,
                    user.first_name,
                    user.last_name,
                    user.email,
                    hash(user.password),
                ]);
                // Release Connection
                conn.release();
                // Return Created User
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error Create ${user.user_name}, Error: ${err}`);
            }
        });
    }
    // Get Method
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'SELECT id, user_name, first_name, last_name, email FROM users WHERE id=($1)';
                // Run SQL Query
                const result = yield conn.query(sql, [id]);
                // Release Connection
                conn.release();
                // Return One User
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error Get User ${id}, Error: ${err}`);
            }
        });
    }
    // Get All Method
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'SELECT id, user_name, first_name, last_name, email FROM users';
                // Run SQL Query
                const result = yield conn.query(sql);
                // Release Connection
                conn.release();
                // Return All Users
                return result.rows;
            }
            catch (err) {
                throw new Error(`Error Get Users ${err}`);
            }
        });
    }
    // Update Method
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'UPDATE users SET user_name=$1, first_name=$2, last_name=$3, email=$4, password=$5 WHERE id=$6 RETURNING id, user_name, first_name, last_name, email';
                // Run SQL Query
                const result = yield conn.query(sql, [
                    user.user_name,
                    user.first_name,
                    user.last_name,
                    user.email,
                    hash(user.password),
                    user.id,
                ]);
                // Release Connection
                conn.release();
                // Return Updated User
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error Update User ${user.user_name}, Error: ${err}`);
            }
        });
    }
    // Delete Method
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1) RETURNING id, user_name, email';
                // Run SQL Query
                const result = yield conn.query(sql, [id]);
                // Release Connection
                conn.release();
                // Return Deleted User
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Error Delete User ${id}, Error: ${err}`);
            }
        });
    }
    // Authenticate Method
    authenticateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Open Connection
                const conn = yield index_database_1.default.connect();
                const sql = 'SELECT password FROM users WHERE email=$1';
                // Run SQL Query
                const result = yield conn.query(sql, [email]);
                // IF True (email & password exist)
                if (result.rows.length) {
                    const { password: hash } = result.rows[0];
                    const isValid = bcrypt_1.default.compareSync(password + config_1.default.pepper, hash);
                    // IF True (return user info)
                    if (isValid) {
                        const sql = 'SELECT id, user_name, first_name, last_name, email FROM users WHERE email=$1';
                        const userData = yield conn.query(sql, [email]);
                        return userData.rows[0];
                    }
                }
                // Release Connection
                conn.release();
                return null;
            }
            catch (err) {
                throw new Error(`Error Authenticate Password with Email ${email}`);
            }
        });
    }
}
exports.UserStore = UserStore;
