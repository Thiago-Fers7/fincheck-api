import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';
import { UpdateBankAccountDto } from 'src/modules/bank-accounts/dto/update-bank-account.dto';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.BankAccountUncheckedCreateInput) {
    return this.prismaService.bankAccount.create({
      data: createDto,
    });
  }

  findAllUserBankAccounts(userId: string) {
    return this.prismaService.bankAccount.findMany({
      where: { userId },
    });
  }

  findUserBankAccount(userId: string, bankAccountId: string) {
    return this.prismaService.bankAccount.findFirst({
      where: { id: bankAccountId, userId },
    });
  }

  update(
    bankAccountId: string,
    updateUserBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.prismaService.bankAccount.update({
      where: { id: bankAccountId },
      data: updateUserBankAccountDto,
    });
  }

  delete(bankAccountId: string) {
    return this.prismaService.bankAccount.delete({
      where: { id: bankAccountId },
    });
  }
}
