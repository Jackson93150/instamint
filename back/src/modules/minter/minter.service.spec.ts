import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { MinterService } from './minter.service';

import { MinterEntity } from '../../models';

describe('MinterService', () => {
  let service: MinterService;
  let repository: Repository<MinterEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MinterService,
        {
          provide: getRepositoryToken(MinterEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MinterService>(MinterService);
    repository = module.get<Repository<MinterEntity>>(
      getRepositoryToken(MinterEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMinter', () => {
    it('should create a new minter', async () => {
      const minter: MinterEntity = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
        id: 0,
        phone: null,
        bio: null,
        pictureUrl: null,
        uniqueUrl: null,
        isPrivate: false,
        twoFactorEnabled: false,
        twoFactorSecret: null,
        createdAt: undefined,
        updatedAt: undefined,
      };
      const hashedPassword = await bcrypt.hash(minter.password, 10);

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce({ ...minter, password: hashedPassword });

      const createdMinter = await service.createMinter(minter);
      expect(createdMinter).toEqual({ ...minter, password: hashedPassword });
    });

    it('should throw error if email is already used', async () => {
      const minter: MinterEntity = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
        id: 0,
        phone: null,
        bio: null,
        pictureUrl: null,
        uniqueUrl: null,
        isPrivate: false,
        twoFactorEnabled: false,
        twoFactorSecret: null,
        createdAt: undefined,
        updatedAt: undefined,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(minter);

      await expect(service.createMinter(minter)).rejects.toThrowError(
        'This email is already used.',
      );
    });

    it('should throw error if email format is invalid', async () => {
      const minter: MinterEntity = {
        username: 'testuser',
        email: 'invalidemail',
        password: 'testpassword',
        id: 0,
        phone: null,
        bio: null,
        pictureUrl: null,
        uniqueUrl: null,
        isPrivate: false,
        twoFactorEnabled: false,
        twoFactorSecret: null,
        createdAt: undefined,
        updatedAt: undefined,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.createMinter(minter)).rejects.toThrowError(
        'The email must be in valid format.',
      );
    });
  });
});
