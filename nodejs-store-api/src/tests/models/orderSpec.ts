import { OrderStore } from '../../models/order.model'

const orderStore = new OrderStore()

describe('Order Models Test', () => {
    describe('Test if Methods Exist', () => {
        it('Should Have Current Order method', () => {
            expect(orderStore.CurrentOrders).toBeDefined()
        })
        it('Should Have Add Product method', () => {
            expect(orderStore.addProduct).toBeDefined()
        })
        it('Should Have Completed Order method', () => {
            expect(orderStore.completedOrders).toBeDefined()
        })
    })
})
