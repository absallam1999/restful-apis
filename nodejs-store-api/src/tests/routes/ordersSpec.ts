import supertest from 'supertest'
import app from '../../index'

const request = supertest(app)
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjo2LCJ1c2VyX25hbWUiOiJBaG1lZDIwIiwiZmlyc3RfbmFtZSI6IkFobWVkIiwibGFzdF9uYW1lIjoiYmFkciIsImVtYWlsIjoidGVzdDIwQHRlc3QuY29tIn0sImlhdCI6MTY2ODQ0MTc5OH0.0Qmf47wb3sXM5t7M8A7BIU9i6yGv3FI1Qq6L5ovG1ds'

describe('Test Orders APIs Methods', () => {
    it('Should Create Order', async () => {
        const response = await request
            .get('/api/orders/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
    it('Should NOT Create Order', async () => {
        const response = await request
            .get('/api/orders/1')
            .set('Content-type', 'application/json')
        expect(response.status).toBe(401)
    })
})
