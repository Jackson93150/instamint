/* eslint-disable max-lines */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LessThan, Repository } from 'typeorm';

import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  UNIQUE_URL_REGEX,
  USERNAME_REGEX,
} from '../../constants';
import { countSubQuery } from '../../constants/query';
import { MinterEntity } from '../../models';
import { DeletedMinter } from '../../models/deleted-Minter.entity';
import { formatRowData } from '../../utils/format';

@Injectable()
export class MinterService {
  constructor(
    @InjectRepository(MinterEntity)
    private readonly minterRepository: Repository<MinterEntity>,

    @InjectRepository(DeletedMinter)
    private readonly deletedMinterRepository: Repository<DeletedMinter>,
  ) {}

  async createMinter(minter: MinterEntity): Promise<MinterEntity> {
    const isMinterAlreadyCreated = await this.minterRepository.findOne({
      where: { email: minter.email },
    });

    if (isMinterAlreadyCreated) {
      const isMinterDeleted = await this.deletedMinterRepository.findOne({
        where: { minterId: isMinterAlreadyCreated.id },
      });

      if (!isMinterDeleted) {
        throw new Error('This email is already used.');
      }
    }

    if (!EMAIL_REGEX.test(minter.email)) {
      throw new Error('The email must be in valid format.');
    }

    if (!PASSWORD_REGEX.test(minter.password)) {
      throw new Error('Password must be in valid format.');
    }

    if (!USERNAME_REGEX.test(minter.username)) {
      throw new Error('Username must be in valid format.');
    }

    const hashedPassword = await bcrypt.hash(minter.password, 10);
    const hashedUniqueUrl = (await bcrypt.hash(minter.username, 1))
      .replace(/[^A-Za-z0-9]/g, '')
      .substring(0, 15);

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
    const minters = await this.minterRepository.find({ where: { email } });
    for (const minter of minters) {
      const isDeleted = await this.deletedMinterRepository.findOne({
        where: { minterId: minter.id },
      });
      if (!isDeleted) {
        return minter;
      }
    }
    return undefined;
  }

  async getMinterByEmailAndId(
    email: string,
    id: number,
  ): Promise<MinterEntity | undefined> {
    return this.minterRepository.findOne({ where: { email, id } });
  }

  async getMinterByUrl(uniqueUrl: string): Promise<MinterEntity | undefined> {
    return this.minterRepository.findOne({ where: { uniqueUrl } });
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

  async deleteMinter(id: number): Promise<void> {
    try {
      const minter = await this.minterRepository.findOne({ where: { id } });
      if (!minter) {
        throw new Error('Minter not found!');
      }
      const deletedMinter = new DeletedMinter();
      deletedMinter.minterId = id;
      await this.deletedMinterRepository.save(deletedMinter);
    } catch (error) {
      console.error('Failed to delete minter:', error);
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeOldMinters() {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const deleteOperations = await this.deletedMinterRepository.find({
      where: {
        deletedAt: LessThan(sixMonthsAgo),
      },
    });

    for (const operation of deleteOperations) {
      this.minterRepository.delete(operation.minterId);
      this.deletedMinterRepository.delete(operation.id);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeUnvalidatedMinters() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDay() - 7);

    try {
      await this.minterRepository
        .createQueryBuilder()
        .delete()
        .from(MinterEntity)
        .where('isValidate = :isValidate', { isValidate: false })
        .andWhere('createdAt < :sevenDaysAgo', { sevenDaysAgo })
        .execute();
    } catch (error) {
      console.error('Failed to remove old unvalidated minters:', error);
    }
  }

  async getMinterById(id: number): Promise<MinterEntity | undefined> {
    return this.minterRepository.findOne({ where: { id } });
  }

  async updateUsername(id: number, username: string): Promise<void> {
    if (!USERNAME_REGEX.test(username)) {
      throw new Error('Unique URL must be in a valid format.');
    }
    const existingMinter = await this.minterRepository.findOne({
      where: {
        username,
      },
    });
    if (!existingMinter) {
      await this.minterRepository.update(id, { username });
    }
  }

  async updatePictureUrl(id: number, pictureUrl: string): Promise<void> {
    await this.minterRepository.update(id, { pictureUrl });
  }

  async updateBannerUrl(id: number, bannerUrl: string): Promise<void> {
    await this.minterRepository.update(id, { bannerUrl });
  }

  async searchMinters(query: string): Promise<any[]> {
    const rawData = await this.minterRepository
      .createQueryBuilder('minter')
      .leftJoin('minter.nft', 'nft')
      .leftJoin('minter.follow', 'follow')
      .where(`minter.id NOT IN (SELECT "minterId" FROM public."deletedMinter")`)
      .andWhere('minter.username ILIKE :query', { query: `%${query}%` })
      .addSelect((subQuery) => {
        return countSubQuery('nft', 'minterId')(subQuery);
      }, 'nftCount')
      .addSelect((subQuery) => {
        return countSubQuery('follow', 'minterId', 'follower')(subQuery);
      }, 'followerCount')
      .addSelect((subQuery) => {
        return countSubQuery('follow', 'minterId', 'followed')(subQuery);
      }, 'followedCount')
      .groupBy('minter.id')
      .getRawMany();

    return formatRowData(rawData);
  }

  async updateBio(id: number, bio: string): Promise<void> {
    if (bio.length > 250) {
      throw new BadRequestException('Bio is longer than 250 characters !');
    }
    const existingMinter = await this.minterRepository.findOne({
      where: { id },
    });
    if (!existingMinter) {
      throw new NotFoundException('Minter not found !');
    }
    await this.minterRepository.update(id, { bio });
  }

  async updatePassword(
    id: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const minter = await this.minterRepository.findOne({ where: { id } });
    if (!minter) {
      throw new Error('Minter not found !');
    }

    if (!(await bcrypt.compare(oldPassword, minter.password))) {
      throw new Error('Old password is wrong !');
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      throw new Error('New password must be in valid format !');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.minterRepository.update(id, { password: hashedPassword });
  }
}
