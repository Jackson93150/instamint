import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DraftService } from './draft.service';

import { DraftEntity } from '../../models';

describe('DraftService', () => {
  let service: DraftService;
  let repository: Repository<DraftEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DraftService,
        {
          provide: getRepositoryToken(DraftEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DraftService>(DraftService);
    repository = module.get<Repository<DraftEntity>>(
      getRepositoryToken(DraftEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new draft', async () => {
    const draft: DraftEntity = {
      id: 1,
      description: 'Test description',
      author: 'Test author',
      hashtag: 'Test hashtag',
      location: 'Test location',
      minter: null,
      content: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(repository, 'save').mockResolvedValueOnce(draft);

    const createdDraft = await service.createDraft(draft);
    expect(createdDraft).toEqual(draft);
  });

  it('should return drafts by minter ID', async () => {
    const minterId = 1;
    const expectedDrafts: DraftEntity[] = [
      {
        id: 1,
        description: 'Test description 1',
        author: 'Test author 1',
        hashtag: 'Test hashtag 1',
        location: 'Test location 1',
        minter: null,
        content: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        description: 'Test description 2',
        author: 'Test author 2',
        hashtag: 'Test hashtag 2',
        location: 'Test location 2',
        minter: null,
        content: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValueOnce(expectedDrafts);

    const result = await service.getDraftByMinterId(minterId);
    expect(result).toEqual(expectedDrafts);
  });
});
