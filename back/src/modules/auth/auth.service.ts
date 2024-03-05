import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { MinterService } from '../minter/minter.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly minterService: MinterService,
  ) {}

  async validateUser(email: string, minterId: number): Promise<any> {
    const minter = this.minterService.getMinterByEmailAndId(email, minterId);
    return minter;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const minter = await this.minterService.getMinterByEmail(email);
    if (!minter) {
      throw new NotFoundException('Minter not found');
    }

    const passwordMatch = await bcrypt.compare(password, minter.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: minter.email, minterId: minter.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
