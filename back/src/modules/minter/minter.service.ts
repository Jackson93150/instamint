import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants';
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
    const newMinter = {
      username: minter.username,
      email: minter.email,
      password: hashedPassword,
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
  async updateProfilePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const minter = await this.minterRepository.findOne({ where: { id: id } });

    const passwordMatch = await bcrypt.compare(oldPassword, minter.password);
    if (!passwordMatch) {
      throw new HttpException(
        'Old Password is incorrect.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      throw new HttpException(
        'New Password must be in valid format.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword: string = await bcrypt.hash(newPassword, 10);
    await this.minterRepository.update(id, { password: hashedPassword });
  }
  async getUserProfile(
    id: number,
  ): Promise<Pick<MinterEntity, 'username' | 'email'>> {
    const minter = await this.minterRepository.findOne({ where: { id: id } });
    if (!minter) {
      throw new Error('User not found');
    }
    return { username: minter.username, email: minter.email };
  }

  async updateProfileEmail(id: number, newEmail: string): Promise<void> {
    const isMinterAlreadyCreated = await this.minterRepository.findOne({
      where: { email: newEmail },
    });

    if (isMinterAlreadyCreated) {
      throw new HttpException(
        'This email is already used.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!EMAIL_REGEX.test(newEmail)) {
      throw new HttpException(
        'The email must be in valid format.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.minterRepository.update(id, { email: newEmail });
    await this.minterRepository.update({ id }, { isValidate: false });
  }
}
