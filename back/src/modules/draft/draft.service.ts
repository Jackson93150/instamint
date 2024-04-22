import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DraftEntity } from '../../models';

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(DraftEntity)
    private readonly draftRepository: Repository<DraftEntity>,
  ) {}

  async createDraft(draft: DraftEntity): Promise<DraftEntity> {
    const createdDraft = await this.draftRepository.save(draft);
    return createdDraft;
  }

  async getDraftByMinterId(minterId: number): Promise<DraftEntity[]> {
    return this.draftRepository.find({
      where: { minter: { id: minterId } },
      relations: ['minter', 'content'],
    });
  }

  async updateDraft(
    id: number,
    draftData: Partial<DraftEntity>,
  ): Promise<DraftEntity> {
    const draftToUpdate = await this.draftRepository.findOne({
      where: { id },
      relations: ['minter', 'content'],
    });
    if (!draftToUpdate) {
      throw new Error('Draft not found');
    }

    const updatedDraft = this.draftRepository.merge(draftToUpdate, draftData);
    return this.draftRepository.save(updatedDraft);
  }
}
