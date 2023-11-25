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
describe('User Modules Test', () => {
    describe('Test if Methods Exist', () => {
        it('Should Have a Create User method', () => {
            expect(userStore.createUser).toBeDefined();
        });
        it('Should Have a Get User method', () => {
            expect(userStore.getUser).toBeDefined();
        });
        it('Should Have a Get Users method', () => {
            expect(userStore.getUsers).toBeDefined();
        });
        it('Should Have a Update User method', () => {
            expect(userStore.updateUser).toBeDefined();
        });
        it('Should Have a delete User method', () => {
            expect(userStore.updateUser).toBeDefined();
        });
        it('Should Have an Authenticate User method', () => {
            expect(userStore.authenticateUser).toBeDefined();
        });
    });
    describe('Test User Model Logic', () => {
        const user = {
            user_name: 'TestUser',
            first_name: 'Test',
            last_name: 'Test',
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
        it('Create method Should Return New User', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield userStore.createUser({
                user_name: 'UserTest',
                first_name: 'Test',
                last_name: 'User',
                email: 'test2@test.com',
            });
            expect(createdUser).toEqual({
                id: createdUser.id,
                user_name: 'UserTest',
                first_name: 'Test',
                last_name: 'User',
                email: 'test2@test.com',
            });
        }));
        it('GetUsers Method Should Return all Users', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield userStore.getUsers();
            expect(users.length).toEqual(2);
        }));
        it('GetUser Method Should Return one User', () => __awaiter(void 0, void 0, void 0, function* () {
            const returnedUser = yield userStore.getUser(user.id);
            expect(returnedUser.id).toBe(user.id);
            expect(returnedUser.user_name).toBe(user.user_name);
            expect(returnedUser.first_name).toBe(user.first_name);
            expect(returnedUser.last_name).toBe(user.last_name);
            expect(returnedUser.email).toBe(user.email);
        }));
        it('Update Method Should Return Updated Data', () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedUser = yield userStore.updateUser(Object.assign(Object.assign({}, user), { user_name: 'updated Username' }));
            expect(updatedUser.id).toBe(user.id);
            expect(updatedUser.user_name).toBe('updated Username');
            expect(updatedUser.first_name).toBe(user.first_name);
            expect(updatedUser.last_name).toBe(user.last_name);
            expect(updatedUser.email).toBe(user.email);
        }));
        it('Authenticate Method Should Return True', () => __awaiter(void 0, void 0, void 0, function* () {
            const authedUser = yield userStore.authenticateUser(user.email, user.password);
            expect(authedUser === null || authedUser === void 0 ? void 0 : authedUser.first_name).toBe(user.first_name);
            expect(authedUser === null || authedUser === void 0 ? void 0 : authedUser.last_name).toBe(user.last_name);
            expect(authedUser === null || authedUser === void 0 ? void 0 : authedUser.email).toEqual(user.email);
        }));
        it('Authenticate Method Should Return Null', () => __awaiter(void 0, void 0, void 0, function* () {
            const authedUser = yield userStore.authenticateUser('wrong@email.com', 'wrong_password');
            expect(authedUser).toBe(null);
        }));
        it('Delete Method Should Delete User', () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedUser = yield userStore.deleteUser(user.id);
            expect(deletedUser.id).toBe(user.id);
        }));
    });
});
