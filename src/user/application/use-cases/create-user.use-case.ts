import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../ports/user.repository.port';

export interface CreateUserDto {
  email: string;
  name: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new Error('Already exist!');
    }

    const user = User.create({ name: dto.name, email: dto.email });

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }
}
