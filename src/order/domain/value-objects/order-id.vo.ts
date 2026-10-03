import { randomUUID } from 'crypto';

export class OrderId {
  private readonly value: string;

  constructor(id?: string) {
    this.value = id || randomUUID();
  }

  getValue(): string {
    return this.value;
  }

  isEqual(otherId: string): boolean {
    return this.value === otherId;
  }
}
