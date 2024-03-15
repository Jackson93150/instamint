import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { Repository } from 'typeorm';

import { firebase } from './firebase';

import { ContentEntity } from '../../models';
const storage = getStorage(firebase);

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly contentRepository: Repository<ContentEntity>,
  ) {}

  async uploadFirebase(id: number, file: Express.Multer.File): Promise<string> {
    const storageRef = ref(storage, `files/${id}/${file.originalname}`);
    const uint8Array = new Uint8Array(file.buffer);
    const fileBlob = new Blob([uint8Array], { type: file.mimetype });
    await uploadBytes(storageRef, fileBlob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

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

  async deleteContent(id: number, name: string): Promise<void> {
    const content = await this.contentRepository.findOne({ where: { name } });
    if (!content) {
      throw new Error(`Content with name '${name}' not found.`);
    }
    await this.contentRepository.remove(content);
    const encodedName = encodeURIComponent(name);
    const storageRef = ref(storage, `files/${id}/${encodedName}`);
    await deleteObject(storageRef);
  }
}