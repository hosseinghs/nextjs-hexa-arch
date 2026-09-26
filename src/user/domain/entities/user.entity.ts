import { Email } from '../value-objects/email.vs';
import { UserId } from '../value-objects/user-id.vo';

export class User {
  constructor(
    private readonly id: UserId,
    private name: string,
    private email: Email,
    private updatedAt: Date,
    private readonly createdAt: Date,
  ) {}

  static create({ name, email }: { name: string; email: string }): User {
    if (!name || name?.trim()?.length < 2) {
      throw new Error('Name must be at least 2 chars');
    }

    return new User(
      new UserId(),
      name.trim(),
      new Email(email),
      new Date(),
      new Date(),
    );
  }

  getId(): UserId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): Email {
    return this.email;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateName(newName: string) {
    this.name = newName;
    this.updatedAt = new Date();
  }

  updateEmail(newEmail: Email) {
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  getAccountAge(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
