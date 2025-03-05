import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BankAccountType } from '../entities/BankAccount';

export class CreateBankAccountDto {
  @IsString({ message: 'Nome da conta inválido' })
  @IsNotEmpty({ message: 'Nome da conta não pode ser vazio' })
  name: string;

  @IsNumber({}, { message: 'Saldo inicial inválido' })
  @IsNotEmpty({ message: 'Saldo inicial não pode ser vazio' })
  initialBalance: number;

  @IsNotEmpty({ message: 'Tipo da conta não pode ser vazio' })
  @IsEnum(BankAccountType, {
    message: 'Tipo da conta inválido (CHECKING, INVESTMENT, CASH)',
  })
  type: BankAccountType;

  @IsNotEmpty({ message: 'Cor da conta não pode ser vazia' })
  @IsHexColor({ message: 'Cor da conta inválida' })
  color: string;
}
