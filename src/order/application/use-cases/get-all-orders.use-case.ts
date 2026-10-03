import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/order/domain/entities/order.entity';
import {
  ORDER_REPOSITORY,
  OrderRepositoryPort,
} from '../ports/order.repository.port';

@Injectable()
export class GetAllOrdersUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
