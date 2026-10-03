import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/order/domain/entities/order.entity';
import {
  ORDER_REPOSITORY,
  OrderRepositoryPort,
} from '../ports/order.repository.port';

@Injectable()
export class GetOrderByIdUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }
}
