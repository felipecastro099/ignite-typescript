import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import 'reflect-metadata';
import { errorHandler } from '@shared/infra/http/middlewares/errorHandler';
import { router } from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm/index';

import swaggerFile from '../../../swagger.json';

import '../../container';

createConnection();
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(errorHandler);

export { app };
