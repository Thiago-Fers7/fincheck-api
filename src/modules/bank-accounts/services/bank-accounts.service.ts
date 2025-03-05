import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateUserBankAccountService } from './validate-user-bank-account.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateUserBankAccountService: ValidateUserBankAccountService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, color, type } = createBankAccountDto;

    return this.bankAccountsRepository.create({
      userId,
      name,
      initialBalance,
      color,
      type,
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findAllUserBankAccounts(userId);
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateUserBankAccountService.validate(userId, bankAccountId);

    const { name, initialBalance, color, type } = updateBankAccountDto;

    return this.bankAccountsRepository.update(bankAccountId, {
      name,
      initialBalance,
      color,
      type,
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateUserBankAccountService.validate(userId, bankAccountId);

    await this.bankAccountsRepository.delete(bankAccountId);

    return null;
  }
}
