import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/order/domain/entities/order.entity';
import {
  ORDER_REPOSITORY,
  OrderRepositoryPort,
} from '../ports/order.repository.port';

@Injectable()
export class GetOrdersByUserIdUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(userId: string): Promise<Order[]> {
    return this.orderRepository.findByUserId(userId);
  }
}
