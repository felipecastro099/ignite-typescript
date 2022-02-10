import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvaliableCarsUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute({ brand, category_id, name }: IRequest) {
        return this.carsRepository.findAllAvailable(brand, category_id, name);
    }
}

export { ListAvaliableCarsUseCase };
