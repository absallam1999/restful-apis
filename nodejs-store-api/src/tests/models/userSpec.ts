import database from '../../database/index.database'
import { UserStore } from '../../models/user.model'
import User from '../../models/types/user.type'

const userStore = new UserStore()

describe('User Modules Test', () => {
    describe('Test if Methods Exist', () => {
        it('Should Have a Create User method', () => {
            expect(userStore.createUser).toBeDefined()
        })
        it('Should Have a Get User method', () => {
            expect(userStore.getUser).toBeDefined()
        })
        it('Should Have a Get Users method', () => {
            expect(userStore.getUsers).toBeDefined()
        })
        it('Should Have a Update User method', () => {
            expect(userStore.updateUser).toBeDefined()
        })
        it('Should Have a delete User method', () => {
            expect(userStore.updateUser).toBeDefined()
        })
        it('Should Have an Authenticate User method', () => {
            expect(userStore.authenticateUser).toBeDefined()
        })
    })
    describe('Test User Model Logic', () => {
        const user = {
            user_name: 'TestUser',
            first_name: 'Test',
            last_name: 'Test',
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
        it('Create method Should Return New User', async () => {
            const createdUser = await userStore.createUser({
                user_name: 'UserTest',
                first_name: 'Test',
                last_name: 'User',
                email: 'test2@test.com',
            } as User)
            expect(createdUser).toEqual({
                id: createdUser.id,
                user_name: 'UserTest',
                first_name: 'Test',
                last_name: 'User',
                email: 'test2@test.com',
            } as User)
        })
        it('GetUsers Method Should Return all Users', async () => {
            const users = await userStore.getUsers()
            expect(users.length).toEqual(2)
        })
        it('GetUser Method Should Return one User', async () => {
            const returnedUser = await userStore.getUser(user.id as number)
            expect(returnedUser.id).toBe(user.id)
            expect(returnedUser.user_name).toBe(user.user_name)
            expect(returnedUser.first_name).toBe(user.first_name)
            expect(returnedUser.last_name).toBe(user.last_name)
            expect(returnedUser.email).toBe(user.email)
        })
        it('Update Method Should Return Updated Data', async () => {
            const updatedUser = await userStore.updateUser({
                ...user,
                user_name: 'updated Username',
            })
            expect(updatedUser.id).toBe(user.id)
            expect(updatedUser.user_name).toBe('updated Username')
            expect(updatedUser.first_name).toBe(user.first_name)
            expect(updatedUser.last_name).toBe(user.last_name)
            expect(updatedUser.email).toBe(user.email)
        })
        it('Authenticate Method Should Return True', async () => {
            const authedUser = await userStore.authenticateUser(
                user.email,
                user.password
            )
            expect(authedUser?.first_name).toBe(user.first_name)
            expect(authedUser?.last_name).toBe(user.last_name)
            expect(authedUser?.email).toEqual(user.email)
        })
        it('Authenticate Method Should Return Null', async () => {
            const authedUser = await userStore.authenticateUser(
                'wrong@email.com',
                'wrong_password'
            )
            expect(authedUser).toBe(null)
        })
        it('Delete Method Should Delete User', async () => {
            const deletedUser = await userStore.deleteUser(user.id as number)
            expect(deletedUser.id).toBe(user.id)
        })
    })
})
