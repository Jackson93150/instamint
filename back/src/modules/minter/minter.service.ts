import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { EMAIL_REGEX, PASSWORD_REGEX, UNIQUE_URL_REGEX } from '../../constants';
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

    if (!PASSWORD_REGEX.test(minter.password)) {
      throw new Error('Password must be in valid format.');
    }

    const hashedPassword = await bcrypt.hash(minter.password, 10);
    const hashedUniqueUrl = (await bcrypt.hash(minter.username, 1)).substring(
      1,
      16,
    );
    const newMinter = {
      username: minter.username,
      email: minter.email,
      password: hashedPassword,
      uniqueUrl: hashedUniqueUrl,
    };

    const createdMinter = await this.minterRepository.save(newMinter);
    return createdMinter;
  }

  async getMinterByEmail(email: string): Promise<MinterEntity | undefined> {
    return this.minterRepository.findOne({ where: { email } });
  }

  async getMinterByEmailAndId(
    email: string,
    id: number,
  ): Promise<MinterEntity | undefined> {
    return this.minterRepository.findOne({ where: { email, id } });
  }

  async validateMinter(id: number): Promise<void> {
    await this.minterRepository.update({ id }, { isValidate: true });
  }

  async updateProfileVisibility(id: number, isPrivate: boolean): Promise<void> {
    await this.minterRepository.update(id, { isPrivate });
  }

  async updateUniqueUrl(id: number, uniqueUrl: string): Promise<void> {
    if (!UNIQUE_URL_REGEX.test(uniqueUrl)) {
      throw new Error('Unique URL must be in a valid format.');
    }
    const existingMinter = await this.minterRepository.findOne({
      where: {
        uniqueUrl,
      },
    });
    if (!existingMinter) {
      await this.minterRepository.update(id, { uniqueUrl });
    }
  }
}
