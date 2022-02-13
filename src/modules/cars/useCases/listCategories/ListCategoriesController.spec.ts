import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('List Categories', () => {
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

    it('should be able to list all categories', async () => {
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
            });

        const response = await request(app).get('/categories').expect(200);

        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('id');
    });
});
