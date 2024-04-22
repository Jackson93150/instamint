import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { MinterService } from '../minter/minter.service';

import { DeletedMinter } from '../../models/deleted-minter.entity';
import { MinterEntity } from '../../models/minter.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly minterService: MinterService,
    @InjectRepository(DeletedMinter)
    private readonly deletedMinterRepository: Repository<DeletedMinter>,
  ) {}

  async validateUser(email: string, minterId: number): Promise<MinterEntity> {
    const minter = this.minterService.getMinterByEmailAndId(email, minterId);
    return minter;
  }

  async validateEmail(email: string): Promise<MinterEntity> {
    const minter = this.minterService.getMinterByEmail(email);
    return minter;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const minter = await this.minterService.getMinterByEmail(email);
    const id = minter.id;
    const deletedMinter = await this.deletedMinterRepository.findOne({
      where: { id },
    });
    if (!minter || deletedMinter) {
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
