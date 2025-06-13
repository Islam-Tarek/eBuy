import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';

@InputType()
export class OrderItemInput {
  @Field(() => String)
  productId!: string;

  @Field(() => Int)
  quantity!: number;

  @Field(() => Float)
  price!: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => [OrderItemInput])
  items!: OrderItemInput[];

  @Field(() => Float)
  totalAmount!: number;
}

export interface CreateOrderServiceDto {
  items: OrderItemInput[];
  totalAmount: number;
  userId?: string;
  status?: OrderStatus;
}
