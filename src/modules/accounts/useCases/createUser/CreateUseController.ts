import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUseUseCase } from './CreateUseUseCase';

class CreateUseController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license } = request.body;

        const createUserUseCase = container.resolve(CreateUseUseCase);

        await createUserUseCase.execute({
            name,
            email,
            password,
            driver_license,
        });

        return response.status(201).send();
    }
}

export { CreateUseController };
