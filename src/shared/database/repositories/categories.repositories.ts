import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findManyByUserId(userId: string) {
    return this.prismaService.category.findMany({
      where: { userId },
    });
  }
}
