import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import { CreateCarSpecicationUseCase } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecicationUseCase';
import { AppError } from '@shared/errors/AppError';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecicationUseCase;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create car specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecicationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it('should be able to add a new specification in car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car',
            description: 'Car test',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 10,
            brand: 'brand',
            category_id: 'category',
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: 'desciprion',
            name: 'test',
        });

        const specifications_id = [specification.id];

        const carCreated = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(carCreated).toHaveProperty('specifications');
        expect(carCreated.specifications.length).toBe(1);
    });

    it('should not be able to add a new specification in car', async () => {
        await expect(async () => {
            const car_id = '1234';
            const specifications_id = ['1234'];

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
