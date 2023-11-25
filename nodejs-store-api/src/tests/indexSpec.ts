import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

describe('Testing EndPoint Server', () => {
    it('Should Get endPoint Status', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
    })
})
