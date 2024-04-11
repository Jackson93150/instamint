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
    return this.draftRepository.find({ where: { minter: { id: minterId } } });
  }
}
