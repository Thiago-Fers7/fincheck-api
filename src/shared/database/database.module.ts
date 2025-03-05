import { CategoriesRepository } from './repositories/categories.repositories';
import { Global, Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repositories';
import { PrismaService } from './prisma.service';
import { BankAccountsRepository } from './repositories/bank-accounts.repositories';

@Global()
@Module({
  exports: [UsersRepository, CategoriesRepository, BankAccountsRepository],
  providers: [
    UsersRepository,
    PrismaService,
    CategoriesRepository,
    BankAccountsRepository,
  ],
})
export class DatabaseModule {}
