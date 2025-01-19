import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly primsmaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const userAlreadyExists = await this.primsmaService.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new ConflictException('Email já cadastrado');
    }

    const user = await this.primsmaService.user.create({
      data: { name, email, password },
    });

    return user;
  }
}
