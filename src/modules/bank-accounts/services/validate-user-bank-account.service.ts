import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateUserBankAccountService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async validate(userId: string, bankAccountId: string) {
    const userBankAccount =
      await this.bankAccountsRepository.findUserBankAccount(
        userId,
        bankAccountId,
      );

    if (!userBankAccount) {
      throw new NotFoundException('Conta bancária não encontrada');
    }
  }
}
