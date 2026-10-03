import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
