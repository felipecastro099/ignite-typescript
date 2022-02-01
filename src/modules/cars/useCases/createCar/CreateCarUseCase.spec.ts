import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from '@modules/cars/useCases/createCar/CreateCarUseCase';
import { AppError } from '@shared/errors/AppError';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it('should be able to create a new car', async () => {
        await createCarUseCase.execute({
            name: 'Car',
            description: 'Car test',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 10,
            brand: 'brand',
            category_id: 'category',
        });
    });

    it('should not be able to create a car with exists licence plate', async () => {
        await expect(async () => {
            await createCarUseCase.execute({
                name: 'Car',
                description: 'Car test',
                daily_rate: 100,
                license_plate: 'ABC-1234',
                fine_amount: 10,
                brand: 'brand',
                category_id: 'category',
            });

            await createCarUseCase.execute({
                name: 'Car',
                description: 'Car test',
                daily_rate: 100,
                license_plate: 'ABC-1234',
                fine_amount: 10,
                brand: 'brand',
                category_id: 'category',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to create a new car with avaliable is true by default', async () => {
        const car = await createCarUseCase.execute({
            name: 'Car',
            description: 'Car test',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 10,
            brand: 'brand',
            category_id: 'category',
        });

        expect(car.avaliable).toBe(true);
    });
});
