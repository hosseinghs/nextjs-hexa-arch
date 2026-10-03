import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { ORDER_REPOSITORY } from './application/ports/order.repository.port';
import { InMemoryOrderRepository } from './infrastructure/adapters/in-memory-order.repository';
import { OrderController } from './presentation/order.controller';
import { GetOrderByIdUseCase } from './application/use-cases/get-order-by-id.use-case';
import { GetAllOrdersUseCase } from './application/use-cases/get-all-orders.use-case';
import { DeleteOrderUseCase } from './application/use-cases/delete-order.use-case';
import { UpdateOrderUseCase } from './application/use-cases/update-order.use-case';
import { GetOrdersByUserIdUseCase } from './application/use-cases/get-orders-by-user-id.use-case';

@Module({
  providers: [
    CreateOrderUseCase,
    DeleteOrderUseCase,
    UpdateOrderUseCase,
    GetOrderByIdUseCase,
    GetAllOrdersUseCase,
    GetOrdersByUserIdUseCase,
    {
      provide: ORDER_REPOSITORY,
      useClass: InMemoryOrderRepository,
    },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
