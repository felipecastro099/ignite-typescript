import { getRepository, Repository } from 'typeorm';

import { CarImages } from '@modules/cars/infra/typeorm/entities/CarImages';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';

class CarImagesRepository implements ICarImagesRepository {
    private repository: Repository<CarImages>;

    constructor() {
        this.repository = getRepository(CarImages);
    }

    async create(car_id: string, image_name: string): Promise<CarImages> {
        const carImage = this.repository.create({
            car_id,
            image_name,
        });

        return this.repository.save(carImage);
    }
}

export { CarImagesRepository };
