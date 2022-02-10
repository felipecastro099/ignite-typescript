import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecicationUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ car_id, specifications_id }: IRequest) {
        const car = await this.carsRepository.findById(car_id);

        if (!car) throw new AppError('Car dos not exists');

        car.specifications = await this.specificationsRepository.findByIds(
            specifications_id
        );

        return this.carsRepository.create(car);
    }
}

export { CreateCarSpecicationUseCase };
