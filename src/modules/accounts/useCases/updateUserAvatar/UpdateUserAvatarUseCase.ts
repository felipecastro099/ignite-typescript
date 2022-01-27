import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { deleteFile } from '@utils/file';

import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: UsersRepository
    ) {}

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found!', 404);
        }

        if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);
        user.avatar = avatar_file;

        await this.userRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };
