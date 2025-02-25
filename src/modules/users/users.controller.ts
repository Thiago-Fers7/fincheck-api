import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async me(@Req() request: any) {
    console.log(request.userId);

    const user = await this.usersService.getUserById(
      '4f181812-5abf-4601-83fd-afce664e4d06',
    );

    return user;
  }
}
