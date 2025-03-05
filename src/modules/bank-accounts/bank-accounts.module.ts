import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { ValidateUserBankAccountService } from './services/validate-user-bank-account.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateUserBankAccountService],
  exports: [ValidateUserBankAccountService],
})
export class BankAccountsModule {}
