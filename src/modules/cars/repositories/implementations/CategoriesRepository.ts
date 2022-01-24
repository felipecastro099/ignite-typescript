import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async list(): Promise<Category[]> {
        return this.repository.find();
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = await this.repository.create({
            name,
            description,
        });

        await this.repository.save(category);
    }

    async findByName(name: string): Promise<Category> {
        return this.repository.findOne({ name });
    }
}

export { CategoriesRepository };
