import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido' })
  email: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password: string;
}
