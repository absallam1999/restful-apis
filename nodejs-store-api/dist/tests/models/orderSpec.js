"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../../models/order.model");
const orderStore = new order_model_1.OrderStore();
describe('Order Models Test', () => {
    describe('Test if Methods Exist', () => {
        it('Should Have Current Order method', () => {
            expect(orderStore.CurrentOrders).toBeDefined();
        });
        it('Should Have Add Product method', () => {
            expect(orderStore.addProduct).toBeDefined();
        });
        it('Should Have Completed Order method', () => {
            expect(orderStore.completedOrders).toBeDefined();
        });
    });
});
