import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('DateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const carAvailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carAvailable) throw new AppError('Car is Unavailable');

        const userAvailable = await this.rentalsRepository.findOpenRentalByUser(
            user_id
        );

        if (userAvailable)
            throw new AppError('There a rental in progress for user!');

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        );

        if (compare < 24) throw new AppError('Invalid return time!');

        return this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });
    }
}

export { CreateRentalUseCase };
