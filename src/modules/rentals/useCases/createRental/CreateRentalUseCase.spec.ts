import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe('Create Rental', () => {
    const dayAdd24hours = dayjs().add(1, 'day').toDate();

    beforeEach(() => {
        dayJsDateProvider = new DayJsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayJsDateProvider
        );
    });

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: '1234',
            car_id: '1234',
            expected_return_date: dayAdd24hours,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('should not be able to create a new rental if there is another open to the same user', async () => {
        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: '1234',
                car_id: '1234',
                expected_return_date: dayAdd24hours,
            });

            await createRentalUseCase.execute({
                user_id: '1234',
                car_id: '123',
                expected_return_date: dayAdd24hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental if there is another open to the same car', async () => {
        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: '1234',
                car_id: '1234',
                expected_return_date: dayAdd24hours,
            });

            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '1234',
                expected_return_date: dayAdd24hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental with invalid return time', async () => {
        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: '1234',
                car_id: '1234',
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
