import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: (req: Request) => {
        if (req && req.cookies) {
          return req.cookies['accessToken'];
        }
        return null;
      },
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: any) {
    const minter = await this.authService.validateUser(
      payload.email,
      payload.minterId,
    );
    if (!minter) {
      throw new UnauthorizedException();
    }
    return minter;
  }
}
