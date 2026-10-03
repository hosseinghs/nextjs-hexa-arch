import { Inject, Injectable } from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  OrderRepositoryPort,
} from '../ports/order.repository.port';

@Injectable()
export class DeleteOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(id: string) {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new Error('Order not found');
    }

    await this.orderRepository.delete(id);
  }
}
