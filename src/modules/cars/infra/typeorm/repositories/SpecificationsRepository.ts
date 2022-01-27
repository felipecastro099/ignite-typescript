import { getRepository, Repository } from 'typeorm';

import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from '../../../repositories/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = await this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        return this.repository.findOne({ name });
    }
}

export { SpecificationsRepository };