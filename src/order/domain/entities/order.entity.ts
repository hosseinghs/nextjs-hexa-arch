import { OrderId } from '../value-objects/order-id.vo';
import { Price } from '../value-objects/price.vo';

export class Order {
  constructor(
    private readonly id: OrderId,
    private userId: string,
    private itemName: string,
    private price: Price,
    private updatedAt: Date,
    private readonly createdAt: Date,
  ) {}

  static create({
    userId,
    itemName,
    price,
  }: {
    userId: string;
    itemName: string;
    price: number;
  }): Order {
    if (!userId?.trim()) {
      throw new Error('User id is required');
    }

    if (!itemName || itemName.trim().length < 2) {
      throw new Error('Item name must be at least 2 chars');
    }

    return new Order(
      new OrderId(),
      userId.trim(),
      itemName.trim(),
      new Price(price),
      new Date(),
      new Date(),
    );
  }

  getId(): OrderId {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getItemName(): string {
    return this.itemName;
  }

  getPrice(): Price {
    return this.price;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateItemName(newItemName: string) {
    if (!newItemName || newItemName.trim().length < 2) {
      throw new Error('Item name must be at least 2 chars');
    }

    this.itemName = newItemName.trim();
    this.updatedAt = new Date();
  }

  updatePrice(newPrice: Price) {
    this.price = newPrice;
    this.updatedAt = new Date();
  }

  getOrderAge(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
