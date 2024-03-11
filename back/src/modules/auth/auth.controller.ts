import {
  Controller,
  Request,
  Post,
  Body,
  Get,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

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
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { accessToken } = await this.authService.login(email, password);
    try {
      res.cookie('accessToken', accessToken, {
        sameSite: 'strict',
        httpOnly: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
