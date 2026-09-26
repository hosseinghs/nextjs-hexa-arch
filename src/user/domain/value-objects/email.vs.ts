export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!this.isValid(email)) {
      throw new Error('Invalid Email');
    }
    this.value = email;
  }

  private isValid(email: string): boolean {
    return email.includes('@');
  }

  getValue(): string {
    return this.value;
  }

  isEqual(otherEmail: string): boolean {
    return this.value === otherEmail;
  }
}
