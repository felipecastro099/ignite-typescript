import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecicationUseCase } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecicationUseCase';

class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { specifications_id } = request.body;

        const createCarSpecificationUseCase = container.resolve(
            CreateCarSpecicationUseCase
        );

        const car = await createCarSpecificationUseCase.execute({
            car_id: id,
            specifications_id,
        });

        return response.json(car);
    }
}

export { CreateCarSpecificationController };
