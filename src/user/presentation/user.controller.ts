import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  CreateUserUseCase,
} from '../application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import {
  UpdateUserDto,
  UpdateUserUseCase,
} from '../application/use-cases/update-user.use-case';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-use.case-by-id';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users.use-case';
import { GetUserByEmailUseCase } from '../application/use-cases/get-user-by-email.use-case';
import { User } from '../domain/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private DeleteUserUseCase: DeleteUserUseCase,
    private GetUserByIdUseCase: GetUserByIdUseCase,
    private GetAllUsersUseCase: GetAllUsersUseCase,
    private UpdateUsersUseCase: UpdateUserUseCase,
    private GetUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  @Post()
  async createUser(@Body() request: CreateUserDto) {
    const user = await this.createUserUseCase.execute(request);

    return this.mapUserResponse(user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.GetUserByIdUseCase.execute(id);
    return this.mapUserResponse(user);
  }

  @Get('/by-email/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.GetUserByEmailUseCase.execute(email);
    return this.mapUserResponse(user);
  }

  @Get()
  async getUsersList() {
    const users = await this.GetAllUsersUseCase.execute();
    return users.map((user) => this.mapUserResponse(user));
  }

  @Patch('id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    await this.UpdateUsersUseCase.execute(id, body);
  }

  @Delete(':id')
  DeleteUser(@Param('id') id: string) {
    return this.DeleteUserUseCase.execute(id);
  }

  private mapUserResponse(user: User | null) {
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.getId().getValue(),
      name: user.getName(),
      email: user.getEmail().getValue(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
      accountAge: user.getAccountAge(),
    };
  }
}
