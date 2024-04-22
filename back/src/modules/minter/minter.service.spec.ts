import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateResult, Repository } from 'typeorm';

import { MinterService } from './minter.service';

import { MinterEntity } from '../../models';
import { DeletedMinter } from '../../models/deleted-minter.entity';

describe('MinterService', () => {
  let service: MinterService;
  let repository: Repository<MinterEntity>;
  let deletedMinterRepository: Repository<DeletedMinter>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MinterService,
        {
          provide: getRepositoryToken(MinterEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(DeletedMinter),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<MinterService>(MinterService);
    repository = module.get<Repository<MinterEntity>>(
      getRepositoryToken(MinterEntity),
    );
    deletedMinterRepository = module.get(getRepositoryToken(DeletedMinter));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createMinter', () => {
    it('should create a new minter if not already created or deleted', async () => {
      const minter: MinterEntity = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword123',
        id: 0,
        phone: null,
        bio: null,
        pictureUrl: null,
        bannerUrl: null,
        uniqueUrl: null,
        isPrivate: false,
        twoFactorEnabled: false,
        twoFactorSecret: null,
        createdAt: undefined,
        updatedAt: undefined,
        isValidate: false,
        contents: null,
        drafts: null,
        nft: null,
      };
      const hashedPassword = await bcrypt.hash(minter.password, 10);
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(deletedMinterRepository, 'findOne')
        .mockResolvedValueOnce(null);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce({ ...minter, password: hashedPassword });
      const createdMinter = await service.createMinter(minter);
      expect(createdMinter).toEqual({ ...minter, password: hashedPassword });
    });
    it('should throw error if email format is invalid', async () => {
      const minter: MinterEntity = {
        username: 'testuser',
        email: 'invalidemail',
        password: 'testpassword123',
        id: 0,
        phone: null,
        bio: null,
        pictureUrl: null,
        bannerUrl: null,
        uniqueUrl: null,
        isPrivate: false,
        twoFactorEnabled: false,
        twoFactorSecret: null,
        createdAt: undefined,
        updatedAt: undefined,
        isValidate: false,
        contents: null,
        drafts: null,
        nft: null,
      };
      jest
        .spyOn(deletedMinterRepository, 'findOne')
        .mockResolvedValueOnce(null);
      await expect(service.createMinter(minter)).rejects.toThrowError(
        'The email must be in valid format.',
      );
    });
    it('should throw error if password format is invalid', async () => {
      const minter: MinterEntity = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
        id: 0,
        phone: null,
        bio: null,
        pictureUrl: null,
        bannerUrl: null,
        uniqueUrl: null,
        isPrivate: false,
        twoFactorEnabled: false,
        twoFactorSecret: null,
        createdAt: undefined,
        updatedAt: undefined,
        isValidate: false,
        contents: null,
        drafts: null,
        nft: null,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.createMinter(minter)).rejects.toThrowError(
        'Password must be in valid format.',
      );
    });
  });
  describe('updateProfileVisibility', () => {
    it('should update the profile visibility of a minter', async () => {
      const isPrivate = true;
      const id = 1;
      const updateResult: UpdateResult = {
        raw: {},
        generatedMaps: [],
        affected: 1,
      };
      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateResult);
      await service.updateProfileVisibility(id, isPrivate);
      expect(repository.update).toHaveBeenCalledWith(id, { isPrivate });
    });
  });
  describe('deleteMinter', () => {
    it('should delete a minter and create a deletion record', async () => {
      const minter: MinterEntity = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword123',
        phone: '',
        bio: '',
        pictureUrl: '',
        bannerUrl: '',
        uniqueUrl: '',
        isPrivate: false,
        twoFactorEnabled: false,
        twoFactorSecret: '',
        contents: [],
        createdAt: undefined,
        updatedAt: undefined,
        isValidate: false,
        drafts: null,
        nft: null,
      };
      const deletedMinter = {
        id: 123,
        minterId: minter.id,
        deletedAt: new Date(),
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(minter);
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1, raw: [] });
      jest
        .spyOn(deletedMinterRepository, 'save')
        .mockResolvedValue(deletedMinter);
      await service.deleteMinter(minter.id);
      expect(deletedMinterRepository.save).toHaveBeenCalled();
    });
  });
});
