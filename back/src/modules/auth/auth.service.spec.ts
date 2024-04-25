import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { AuthService } from './auth.service';
import { MinterService } from '../minter/minter.service';

import { MinterEntity } from '../../models';
import { DeletedMinter } from '../../models/deleted-Minter.entity';

describe('AuthService', () => {
  let service: AuthService;
  let minterService: MinterService;
  let deletedMinterRepository: Repository<DeletedMinter>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedToken'),
          },
        },
        {
          provide: MinterService,
          useValue: {
            getMinterByEmail: jest.fn(),
            getMinterByEmailAndId: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(DeletedMinter),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    minterService = module.get<MinterService>(MinterService);
    deletedMinterRepository = module.get(getRepositoryToken(DeletedMinter));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw NotFoundException if minter is deleted', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      const minter: MinterEntity = {
        username: 'testuser',
        email: email,
        password: await bcrypt.hash(password, 10),
        id: 1,
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
        follow: null,
      };

      jest.spyOn(minterService, 'getMinterByEmail').mockResolvedValue(minter);
      jest
        .spyOn(deletedMinterRepository, 'findOne')
        .mockResolvedValue(new DeletedMinter());

      await expect(service.login(email, password)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return access token if email and password are correct and minter is not deleted', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      const minter: MinterEntity = {
        username: 'testuser',
        email: email,
        password: await bcrypt.hash(password, 10),
        id: 1,
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
        follow: null,
      };

      jest.spyOn(minterService, 'getMinterByEmail').mockResolvedValue(minter);
      jest.spyOn(deletedMinterRepository, 'findOne').mockResolvedValue(null);

      const result = await service.login(email, password);

      expect(result).toEqual({ accessToken: 'mockedToken' });
    });
  });
});
