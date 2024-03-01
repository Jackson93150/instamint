// content.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinterEntity } from 'src/models';
import { EMAIL_REGEX } from 'src/constants';
import * as bcrypt from 'bcrypt';

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
}
