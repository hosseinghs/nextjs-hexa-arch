import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateOrderDto,
  CreateOrderUseCase,
} from '../application/use-cases/create-order.use-case';
import { DeleteOrderUseCase } from '../application/use-cases/delete-order.use-case';
import {
  UpdateOrderDto,
  UpdateOrderUseCase,
} from '../application/use-cases/update-order.use-case';
import { GetOrderByIdUseCase } from '../application/use-cases/get-order-by-id.use-case';
import { GetAllOrdersUseCase } from '../application/use-cases/get-all-orders.use-case';
import { GetOrdersByUserIdUseCase } from '../application/use-cases/get-orders-by-user-id.use-case';
import { Order } from '../domain/entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly getOrdersByUserIdUseCase: GetOrdersByUserIdUseCase,
  ) {}

  @Post()
  async createOrder(@Body() request: CreateOrderDto) {
    const order = await this.createOrderUseCase.execute(request);
    return this.mapOrderResponse(order);
  }

  @Get()
  async getOrdersList() {
    const orders = await this.getAllOrdersUseCase.execute();
    return orders.map((order) => this.mapOrderResponse(order));
  }

  @Get('by-user/:userId')
  async getOrdersByUser(@Param('userId') userId: string) {
    const orders = await this.getOrdersByUserIdUseCase.execute(userId);
    return orders.map((order) => this.mapOrderResponse(order));
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    const order = await this.getOrderByIdUseCase.execute(id);
    return this.mapOrderResponse(order);
  }

  @Patch(':id')
  async updateOrder(@Param('id') id: string, @Body() body: UpdateOrderDto) {
    const order = await this.updateOrderUseCase.execute(id, body);
    return this.mapOrderResponse(order);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.deleteOrderUseCase.execute(id);
  }

  private mapOrderResponse(order: Order | null) {
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      id: order.getId().getValue(),
      userId: order.getUserId(),
      itemName: order.getItemName(),
      price: order.getPrice().getValue(),
      createdAt: order.getCreatedAt(),
      updatedAt: order.getUpdatedAt(),
      orderAge: order.getOrderAge(),
    };
  }
}
