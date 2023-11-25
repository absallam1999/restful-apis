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
exports.authenticate = exports.destroyUser = exports.updateUser = exports.getUsers = exports.getUser = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const config_1 = __importDefault(require("../database/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create Instacne From User Model
const userStore = new user_model_1.UserStore();
// CREATE Method Handler
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield userStore.createUser(req.body);
        res.status(200).json({
            status: 'SUCCESS',
            user: newUser,
            message: 'User Created Successfully',
        });
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.createUser = createUser;
// GET Method Handler
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userStore.getUser(req.params.id);
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.getUser = getUser;
// GET All Method Handler
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userStore.getUsers();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error:${err}`);
    }
});
exports.getUsers = getUsers;
// UPDATE Method Handler
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            id: req.params.id,
        };
        const updatedUser = yield userStore.updateUser(user);
        res.status(200).json({
            status: 'SUCCESS',
            user: updatedUser,
            message: 'User Updated Successfully',
        });
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.updateUser = updateUser;
// DELETE Method Handler
const destroyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield userStore.deleteUser(req.params.id);
        res.status(200).json({
            status: 'SUCCESS',
            user: deletedUser,
            message: 'User Deleted',
        });
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.destroyUser = destroyUser;
// Authenticate Method Handler
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const u = yield userStore.authenticateUser(user.email, user.password);
        const token = jsonwebtoken_1.default.sign({ u }, config_1.default.tokensecret);
        if (!u) {
            return res.status(401).json({
                status: 'INVALID DATA',
                message: 'Failed Authenticated .. Please Try Again',
            });
        }
        return res.status(200).json({
            status: 'SUCCESS',
            user: Object.assign(Object.assign({}, u), { token }),
            massege: 'Authenticated Successfully',
        });
    }
    catch (err) {
        res.status(400);
        throw new Error(`Error: ${err}`);
    }
});
exports.authenticate = authenticate;
