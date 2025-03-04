import { CategoriesRepository } from './repositories/categories.repositories';
import { Global, Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repositories';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  exports: [UsersRepository, CategoriesRepository],
  providers: [UsersRepository, PrismaService, CategoriesRepository],
})
export class DatabaseModule {}
