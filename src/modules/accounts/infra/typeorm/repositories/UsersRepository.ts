import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    findByEmail(email: string): Promise<User> {
        return this.repository.findOne({ email });
    }

    async create({
        name,
        email,
        password,
        driver_license,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license,
            avatar,
            id,
        });

        await this.repository.save(user);
    }

    findById(id: string): Promise<User> {
        return this.repository.findOne(id);
    }
}

export { UsersRepository };
