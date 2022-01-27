import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import 'reflect-metadata';

import { errorHandler } from '@shared/infra/http/middlewares/errorHandler';
import { router } from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';

import '../typeorm';
import '../../container';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(errorHandler);

app.listen(3333, () => console.log('Server is running'));
