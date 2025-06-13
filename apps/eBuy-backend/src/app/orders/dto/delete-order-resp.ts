import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteOrderResp {
  @Field(() => String)
  orderId!: string;

  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  error?: string;
}
