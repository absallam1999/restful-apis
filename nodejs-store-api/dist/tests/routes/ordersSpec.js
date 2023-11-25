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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const request = (0, supertest_1.default)(index_1.default);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjo2LCJ1c2VyX25hbWUiOiJBaG1lZDIwIiwiZmlyc3RfbmFtZSI6IkFobWVkIiwibGFzdF9uYW1lIjoiYmFkciIsImVtYWlsIjoidGVzdDIwQHRlc3QuY29tIn0sImlhdCI6MTY2ODQ0MTc5OH0.0Qmf47wb3sXM5t7M8A7BIU9i6yGv3FI1Qq6L5ovG1ds';
describe('Test Orders APIs Methods', () => {
    it('Should Create Order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/api/orders/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
    it('Should NOT Create Order', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/api/orders/1')
            .set('Content-type', 'application/json');
        expect(response.status).toBe(401);
    }));
});
