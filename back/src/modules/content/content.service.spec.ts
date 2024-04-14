import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContentService } from './content.service';

import { ContentEntity } from '../../models';

describe('ContentService', () => {
  let service: ContentService;
  let repository: Repository<ContentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: getRepositoryToken(ContentEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ContentService>(ContentService);
    repository = module.get<Repository<ContentEntity>>(
      getRepositoryToken(ContentEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createContent', () => {
    it('should create a new content', async () => {
      const content: ContentEntity = {
        id: 1,
        name: 'testcontent',
        url: 'http://example.com/testcontent',
        type: 'image',
        minter: null,
        drafts: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(content);

      const createdContent = await service.createContent(content);
      expect(createdContent).toEqual(content);
    });

    it('should throw error if content already exists', async () => {
      const existingContent: ContentEntity = {
        id: 1,
        name: 'existingcontent',
        url: 'http://example.com/existingcontent',
        type: 'image',
        minter: null,
        drafts: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(existingContent);

      await expect(service.createContent(existingContent)).rejects.toThrowError(
        'This content is already uploaded.',
      );
    });
  });

  describe('getContentByMinterId', () => {
    it('should return content by minter ID', async () => {
      const minterId = 1;
      const expectedContent: ContentEntity[] = [
        {
          id: 1,
          name: 'content1',
          url: 'http://example.com/content1',
          type: 'image',
          minter: null,
          drafts: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'content2',
          url: 'http://example.com/content2',
          type: 'video',
          minter: null,
          drafts: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValueOnce(expectedContent);

      const result = await service.getContentByMinterId(minterId);
      expect(result).toEqual(expectedContent);
    });
  });
});
