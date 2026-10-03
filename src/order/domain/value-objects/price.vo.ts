export class Price {
  private readonly value: number;

  constructor(price: number) {
    if (!this.isValid(price)) {
      throw new Error('Invalid price');
    }
    this.value = price;
  }

  private isValid(price: number): boolean {
    return typeof price === 'number' && Number.isFinite(price) && price > 0;
  }

  getValue(): number {
    return this.value;
  }

  isEqual(otherPrice: number): boolean {
    return this.value === otherPrice;
  }
}
