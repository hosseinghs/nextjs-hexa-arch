import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { USER_REPOSITORY } from './application/ports/user.repository.port';
import { inMemoryUserRepository } from './infrastructure/adapters/in-memory-user.repository';
import { UserController } from './presentation/user.controller';
import { GetUserByIdUseCase } from './application/use-cases/get-user-use.case-by-id';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { GetUserByEmailUseCase } from './application/use-cases/get-user-by-email.use-case';

@Module({
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    GetUserByIdUseCase,
    GetAllUsersUseCase,
    GetUserByEmailUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: inMemoryUserRepository,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
