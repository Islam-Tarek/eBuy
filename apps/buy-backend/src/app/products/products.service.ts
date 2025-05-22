import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  // search(term: string) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private readonly prisma: PrismaService) {}

  create(createProductInput: CreateProductInput) {
    return this.prisma.product.create({
      data: createProductInput,
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async searchProducts(term: string): Promise<Product[]> {
    const lowerCaseTerm = term.toLowerCase();
    return this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: lowerCaseTerm, mode: 'insensitive' } },
          { description: { contains: lowerCaseTerm, mode: 'insensitive' } },
        ],
      },
    });
  }

  update(id: string, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
