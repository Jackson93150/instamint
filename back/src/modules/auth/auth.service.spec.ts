import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { MinterEntity } from 'src/models';

import { AuthService } from './auth.service';
import { MinterService } from '../minter/minter.service';

describe('AuthService', () => {
  let service: AuthService;
  let minterService: MinterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockedToken'),
          },
        },
        {
          provide: MinterService,
          useValue: {
            getMinterByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    minterService = module.get<MinterService>(MinterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw NotFoundException if minter not found', async () => {
      jest.spyOn(minterService, 'getMinterByEmail').mockResolvedValueOnce(null);

      await expect(
        service.login('test@example.com', 'password'),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const minter: MinterEntity = {
        username: 'testuser',
        email: 'test@example.com',
        password: await bcrypt.hash('correctPassword', 10),
        id: 1,
        phone: null,
        bio: null,
        pictureUrl: null,
        uniqueUrl: null,
        isPrivate: false,
        twoFactorEnabled: false,
        twoFactorSecret: null,
        createdAt: undefined,
        updatedAt: undefined,
        isValidate: false,
        contents: null,
      };
      jest
        .spyOn(minterService, 'getMinterByEmail')
        .mockResolvedValueOnce(minter);

      await expect(
        service.login('test@example.com', 'incorrectPassword'),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should return access token if email and password are correct', async () => {
      const minter: MinterEntity = {
        username: 'testuser',
        email: 'test@example.com',
        password: await bcrypt.hash('correctPassword', 10),
        id: 1,
        phone: null,
        bio: null,
        pictureUrl: null,
        uniqueUrl: null,
        isPrivate: false,
        twoFactorEnabled: false,
        twoFactorSecret: null,
        createdAt: undefined,
        updatedAt: undefined,
        isValidate: false,
        contents: null,
      };
      jest
        .spyOn(minterService, 'getMinterByEmail')
        .mockResolvedValueOnce(minter);

      const result = await service.login('test@example.com', 'correctPassword');

      expect(result.accessToken).toEqual('mockedToken');
    });
  });
});
