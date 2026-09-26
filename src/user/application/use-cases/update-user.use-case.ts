import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../ports/user.repository.port';

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User Not found');
    }

    if (dto?.name) user.updateName(dto.name);
    if (dto?.email) user.updateName(dto.email);

    return this.userRepository.save(user);
  }
}
