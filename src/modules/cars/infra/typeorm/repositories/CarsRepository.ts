import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

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
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = await this.repository.create({
            name,
            description,
            category_id,
            daily_rate,
            fine_amount,
            license_plate,
            brand,
            specifications,
            id,
        });

        return this.repository.save(car);
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.repository.findOne({ license_plate });
    }

    async findAllAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder('c')
            .where('avaliable = :avaliable', { avaliable: true });

        if (brand) {
            carsQuery.andWhere('c.brand = :brand', { brand });
        }

        if (name) {
            carsQuery.andWhere('c.name = :name', { name });
        }

        if (category_id) {
            carsQuery.andWhere('c.category_id = :category_id', { category_id });
        }

        return carsQuery.getMany();
    }

    async findById(id: string): Promise<Car> {
        return this.repository.findOne({ id });
    }
}

export { CarsRepository };
