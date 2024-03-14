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
import { EmailVerificationGuard } from './jwt-mail-auth.guard';
import { MinterService } from '../minter/minter.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly minterService: MinterService,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Request() req: any) {
    console.log(req);
    return req.user;
  }

  @Post('confirm')
  @UseGuards(EmailVerificationGuard)
  async validateEmail(@Request() req: any): Promise<void> {
    console.log(req);
    await this.minterService.validateMinter(req.user.id);
  }

  @Post('login')
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { accessToken } = await this.authService.login(email, password);
    console.log(accessToken);
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
