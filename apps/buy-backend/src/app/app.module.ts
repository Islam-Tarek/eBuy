import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client/extension';

@Module({
  imports: [PrismaClient],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
