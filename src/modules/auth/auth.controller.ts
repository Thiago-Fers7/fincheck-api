import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('signup')
  create(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }
}
