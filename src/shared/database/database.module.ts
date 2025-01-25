import { Global, Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repositories';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  exports: [UsersRepository],
  providers: [UsersRepository, PrismaService],
})
export class DatabaseModule {}
