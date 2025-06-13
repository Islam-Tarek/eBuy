import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class FindProductArgs {
  @Field(() => String)
  id!: string;
}
