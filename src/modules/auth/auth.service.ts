import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';

type Category = {
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE';
};

const categories: Category[] = [
  // Income
  { name: 'Salário', icon: 'salary', type: 'INCOME' },
  { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
  { name: 'Outro', icon: 'other', type: 'INCOME' },
  // Expense
  { name: 'Casa', icon: 'home', type: 'EXPENSE' },
  { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
  { name: 'Educação', icon: 'education', type: 'EXPENSE' },
  { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
  { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
  { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
  {
    name: 'Transporte',
    icon: 'transport',
    type: 'EXPENSE',
  },
  { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
  { name: 'Outro', icon: 'other', type: 'EXPENSE' },
];

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const { name, email, password } = signUpDto;

    const userAlreadyExists = await this.usersRepo.userExists(email);

    if (userAlreadyExists) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: { createMany: { data: categories } },
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersRepo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
