import { Injectable } from '@nestjs/common';
import { OrderRepositoryPort } from 'src/order/application/ports/order.repository.port';
import { Order } from 'src/order/domain/entities/order.entity';

@Injectable()
export class InMemoryOrderRepository implements OrderRepositoryPort {
  private readonly orders: Map<string, Order> = new Map();

  save(order: Order): Promise<Order> {
    this.orders.set(order.getId().getValue(), order);
    return Promise.resolve(order);
  }

  findAll(): Promise<Order[]> {
    return Promise.resolve(Array.from(this.orders.values()));
  }

  findByUserId(userId: string): Promise<Order[]> {
    const orders = Array.from(this.orders.values()).filter(
      (order) => order.getUserId() === userId,
    );
    return Promise.resolve(orders);
  }

  findById(id: string): Promise<Order | null> {
    return Promise.resolve(this.orders.get(id) ?? null);
  }

  delete(id: string): Promise<void> {
    this.orders.delete(id);
    return Promise.resolve();
  }
}
