import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { EMAIL_REGEX } from '../../constants';
import { MinterEntity } from '../../models';

@Injectable()
export class MinterService {
  constructor(
    @InjectRepository(MinterEntity)
    private readonly minterRepository: Repository<MinterEntity>,
  ) {}

  async createMinter(minter: MinterEntity): Promise<MinterEntity> {
    const isMinterAlreadyCreated = await this.minterRepository.findOne({
      where: { email: minter.email },
    });

    if (isMinterAlreadyCreated) {
      throw new Error('This email is already used.');
    }

    if (!EMAIL_REGEX.test(minter.email)) {
      throw new Error('The email must be in valid format.');
    }

    const hashedPassword = await bcrypt.hash(minter.password, 10);
    const newMinter = {
      username: minter.username,
      email: minter.email,
      password: hashedPassword,
    };

    const createdMinter = await this.minterRepository.save(newMinter);
    return createdMinter;
  }

  async getMinterByEmail(email: string): Promise<MinterEntity | undefined> {
    return this.minterRepository.findOne({ where: { email: email } });
  }

  async getMinterByEmailAndId(
    email: string,
    id: number,
  ): Promise<MinterEntity | undefined> {
    return this.minterRepository.findOne({ where: { email: email, id: id } });
  }
}