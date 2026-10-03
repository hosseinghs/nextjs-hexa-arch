import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/order/domain/entities/order.entity';
import {
  ORDER_REPOSITORY,
  OrderRepositoryPort,
} from '../ports/order.repository.port';

export interface CreateOrderDto {
  userId: string;
  itemName: string;
  price: number;
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(dto: CreateOrderDto): Promise<Order> {
    const order = Order.create({
      userId: dto.userId,
      itemName: dto.itemName,
      price: dto.price,
    });

    return this.orderRepository.save(order);
  }
}
