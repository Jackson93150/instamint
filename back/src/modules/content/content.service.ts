import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContentEntity } from '../../models';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
  ) {}

  async createContent(content: ContentEntity): Promise<ContentEntity> {
    const isContentAlreadyCreated = await this.contentRepository.findOne({
      where: { name: content.name },
    });

    if (isContentAlreadyCreated) {
      throw new Error('This content is already uploaded.');
    }

    const createdContent = await this.contentRepository.save(content);
    return createdContent;
  }

  async getContentByMinterId(minterId: number): Promise<ContentEntity[]> {
    return this.contentRepository.find({ where: { minter: { id: minterId } } });
  }
}
