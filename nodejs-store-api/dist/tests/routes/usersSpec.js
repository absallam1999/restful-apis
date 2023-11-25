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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const userStore = new user_model_1.UserStore();
const request = (0, supertest_1.default)(index_1.default);
let token = '';
describe('User API Endpoints', () => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        user_name: 'TestUser',
        first_name: 'Test',
        last_name: 'User',
        email: 'test@test.com',
        password: 'test123',
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
    describe('Test Authenticate Mehtod', () => {
        it('Should authenticate User & get Token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({ email: 'test@test.com', password: 'test123' });
            expect(response.status).toBe(200);
            const { id, email, token: userToken } = response.body.user;
            expect(id).toBe(user.id);
            expect(email).toBe('test@test.com');
            token = userToken;
        }));
        it('Should Unauthenticate User & NOT get Token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({ email: 'wwrong@email.com', password: 'test123' });
            expect(response.status).toBe(401);
        }));
    });
    describe('Test Users CRUD APIs Methods', () => {
        it('Should Create User', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                user_name: 'UserTest',
                first_name: 'User',
                last_name: 'Test',
                email: 'test2@test.com',
            });
            expect(response.status).toBe(200);
            const { user_name, first_name, last_name, email } = response.body.user;
            expect(user_name).toBe('UserTest');
            expect(first_name).toBe('User');
            expect(last_name).toBe('Test');
            expect(email).toBe('test2@test.com');
        }));
        it('Should Get Users', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.users).toBe(response.body.users);
        }));
        it('Should Get User', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get(`/api/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.user.user_name).toBe('TestUser');
            expect(response.body.user.email).toBe('test@test.com');
        }));
        it('Should Update User', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .patch(`/api/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(Object.assign(Object.assign({}, user), { user_name: 'Mohamed Badr' }));
            expect(response.status).toBe(200);
            const { id, user_name, first_name, last_name, email } = response.body.user;
            expect(id).toBe(user.id);
            expect(user_name).toBe('Mohamed Badr');
            expect(first_name).toBe(user.first_name);
            expect(last_name).toBe(user.last_name);
            expect(email).toBe(user.email);
        }));
        it('Should Delete User', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .delete(`/api/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.user.id).toBe(user.id);
            expect(response.body.user.user_name).toBe('Mohamed Badr');
        }));
    });
}));
