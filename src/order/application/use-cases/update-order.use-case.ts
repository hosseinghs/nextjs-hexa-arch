import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/order/domain/entities/order.entity';
import { Price } from 'src/order/domain/value-objects/price.vo';
import {
  ORDER_REPOSITORY,
  OrderRepositoryPort,
} from '../ports/order.repository.port';

export interface UpdateOrderDto {
  itemName?: string;
  price?: number;
}

@Injectable()
export class UpdateOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new Error('Order not found');
    }

    if (dto.itemName) order.updateItemName(dto.itemName);
    if (dto.price !== undefined) order.updatePrice(new Price(dto.price));

    return this.orderRepository.save(order);
  }
}
