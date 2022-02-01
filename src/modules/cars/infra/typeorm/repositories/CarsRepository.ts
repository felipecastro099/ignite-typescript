import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        name,
        description,
        category_id,
        daily_rate,
        fine_amount,
        license_plate,
        brand,
    }: ICreateCarDTO): Promise<Car> {
        const car = await this.repository.create({
            name,
            description,
            category_id,
            daily_rate,
            fine_amount,
            license_plate,
            brand,
        });

        return this.repository.save(car);
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.repository.findOne({ license_plate });
    }
}

export { CarsRepository };
