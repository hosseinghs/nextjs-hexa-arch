import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/user/application/ports/user.repository.port';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class inMemoryUserRepository implements UserRepositoryPort {
  private readonly users: Map<string, User> = new Map();

  save(user: User): Promise<User> {
    this.users.set(user.getId().getValue(), user);
    return Promise.resolve(user);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(Array.from(this.users.values()));
  }

  findByEmail(email: string): Promise<User | null> {
    const users = Array.from(this.users.values());
    const user =
      users.find((candidate) => candidate.getEmail().getValue() === email) ??
      null;
    return Promise.resolve(user);
  }

  findById(id: string): Promise<User | null> {
    return Promise.resolve(this.users.get(id) ?? null);
  }

  delete(id: string): Promise<void> {
    this.users.delete(id);
    return Promise.resolve();
  }
}
