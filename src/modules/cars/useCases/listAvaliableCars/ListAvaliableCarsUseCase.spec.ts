import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvaliableCarsUseCase } from '@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvaliableCarsUseCase;

describe('List cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvaliableCarsUseCase(carsRepositoryInMemory);
    });

    it('should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Corolla',
            description: 'Descrição',
            daily_rate: 150,
            license_plate: 'FEL-123',
            fine_amount: 100,
            brand: 'toyota',
            category_id: '7cce9db2-1b80-4faa-b875-8b747a51c148',
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('should be able to list all avaliable cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Corolla',
            description: 'Descrição',
            daily_rate: 150,
            license_plate: 'FEL-123',
            fine_amount: 100,
            brand: 'toyota',
            category_id: '7cce9db2-1b80-4faa-b875-8b747a51c148',
        });

        const cars = await listCarsUseCase.execute({
            brand: 'toyota',
        });

        expect(cars).toEqual([car]);
    });

    it('should be able to list all avaliable cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Corolla',
            description: 'Descrição',
            daily_rate: 150,
            license_plate: 'FEL-123',
            fine_amount: 100,
            brand: 'toyota',
            category_id: '7cce9db2-1b80-4faa-b875-8b747a51c148',
        });

        const cars = await listCarsUseCase.execute({
            brand: 'Corrolla',
        });

        expect(cars).toEqual([car]);
    });

    it('should be able to list all avaliable cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Corolla',
            description: 'Descrição',
            daily_rate: 150,
            license_plate: 'FEL-123',
            fine_amount: 100,
            brand: 'toyota',
            category_id: '7cce9db2-1b80-4faa-b875-8b747a51c148',
        });

        const cars = await listCarsUseCase.execute({
            category_id: '7cce9db2-1b80-4faa-b875-8b747a51c148',
        });

        expect(cars).toEqual([car]);
    });
});
