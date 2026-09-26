import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../ports/user.repository.port';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(id);

    if (!user) {
      throw new Error('Not founds');
    }
    return user;
  }
}
