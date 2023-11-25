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
const index_database_1 = __importDefault(require("../../database/index.database"));
const user_model_1 = require("../../models/user.model");
const userStore = new user_model_1.UserStore();
describe('Test User Model Logic', () => {
    const user = {
        user_name: 'TestUser',
        first_name: 'Test',
        last_name: 'Test',
        email: 'test@test.com',
        password: 'test123'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield userStore.createUser(user);
        user.id = createdUser.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield index_database_1.default.connect();
        const sql = 'DELETE FROM users';
        yield conn.query(sql);
        conn.release();
    }));
    it('Authenticate Method Should Return True', () => __awaiter(void 0, void 0, void 0, function* () {
        const authedUser = yield userStore.authenticateUser(user.email, user.password);
        expect(authedUser === null || authedUser === void 0 ? void 0 : authedUser.first_name).toBe(user.first_name);
        expect(authedUser === null || authedUser === void 0 ? void 0 : authedUser.last_name).toBe(user.last_name);
        expect(authedUser === null || authedUser === void 0 ? void 0 : authedUser.email).toEqual(user.email);
    }));
    it('Authenticate Method Should Return Null', () => __awaiter(void 0, void 0, void 0, function* () {
        const authedUser = yield userStore.authenticateUser('mohamed@mohamed.com', 'wrong_password');
        expect(authedUser).toBe(null);
    }));
});
