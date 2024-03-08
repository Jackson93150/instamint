import {
  Controller,
  Request,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Request() req: any) {
    console.log(req);
    return req.user;
  }

  @Post('login')
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    const token = await this.authService.login(email, password);
    return token;
  }
}
