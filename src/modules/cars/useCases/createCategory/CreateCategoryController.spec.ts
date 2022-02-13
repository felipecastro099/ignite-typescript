import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create category controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        const id = uuidV4();
        const password = await hash('admin', 0);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at) values ('${id}', 'admin', 'admin@email.com', '${password}', '1234', true, 'now()')`
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should be able to create a new category', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@email.com',
            password: 'admin',
        });

        const { token } = responseToken.body;

        const category = {
            name: 'test',
            description: 'test',
        };

        await request(app)
            .post('/categories')
            .send(category)
            .set({
                Authorization: `Bearer ${token}`,
            })
            .expect(201);
    });

    it('should not be able to create a new category with name exists', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@email.com',
            password: 'admin',
        });

        const { token } = responseToken.body;

        const category = {
            name: 'test',
            description: 'test',
        };

        await request(app)
            .post('/categories')
            .send(category)
            .set({
                Authorization: `Bearer ${token}`,
            })
            .expect(400);
    });
});
