import database from '../../database/index.database'
import { UserStore } from '../../models/user.model'
import User from '../../models/types/user.type'
import supertest from 'supertest'
import app from '../../index'

const userStore = new UserStore()
const request = supertest(app)
let token = ''

describe('User API Endpoints', async () => {
    const user = {
        user_name: 'TestUser',
        first_name: 'Test',
        last_name: 'User',
        email: 'test@test.com',
        password: 'test123',
    } as User

    beforeAll(async () => {
        const createdUser = await userStore.createUser(user)
        user.id = createdUser.id
    })

    afterAll(async () => {
        const conn = await database.connect()
        const sql = 'DELETE FROM users'
        await conn.query(sql)
        conn.release()
    })

    describe('Test Authenticate Mehtod', () => {
        it('Should authenticate User & get Token', async () => {
            const response = await request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({ email: 'test@test.com', password: 'test123' })
            expect(response.status).toBe(200)
            const { id, email, token: userToken } = response.body.user
            expect(id).toBe(user.id)
            expect(email).toBe('test@test.com')
            token = userToken
        })
        it('Should Unauthenticate User & NOT get Token', async () => {
            const response = await request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({ email: 'wwrong@email.com', password: 'test123' })
            expect(response.status).toBe(401)
        })
    })

    describe('Test Users CRUD APIs Methods', () => {
        it('Should Create User', async () => {
            const response = await request
                .post('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    user_name: 'UserTest',
                    first_name: 'User',
                    last_name: 'Test',
                    email: 'test2@test.com',
                } as User)
            expect(response.status).toBe(200)
            const { user_name, first_name, last_name, email } =
                response.body.user
            expect(user_name).toBe('UserTest')
            expect(first_name).toBe('User')
            expect(last_name).toBe('Test')
            expect(email).toBe('test2@test.com')
        })
        it('Should Get Users', async () => {
            const response = await request
                .get('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200)
            expect(response.body.users).toBe(response.body.users)
        })
        it('Should Get User', async () => {
            const response = await request
                .get(`/api/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200)
            expect(response.body.user.user_name).toBe('TestUser')
            expect(response.body.user.email).toBe('test@test.com')
        })
        it('Should Update User', async () => {
            const response = await request
                .patch(`/api/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({ ...user, user_name: 'Mohamed Badr' })
            expect(response.status).toBe(200)
            const { id, user_name, first_name, last_name, email } =
                response.body.user
            expect(id).toBe(user.id)
            expect(user_name).toBe('Mohamed Badr')
            expect(first_name).toBe(user.first_name)
            expect(last_name).toBe(user.last_name)
            expect(email).toBe(user.email)
        })
        it('Should Delete User', async () => {
            const response = await request
                .delete(`/api/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200)
            expect(response.body.user.id).toBe(user.id)
            expect(response.body.user.user_name).toBe('Mohamed Badr')
        })
    })
})
