/* eslint-disable max-lines */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateResult, Repository } from 'typeorm';

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
        password: 'testpassword123',
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
        isValidate: false,
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
        password: 'testpassword123',
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
        isValidate: false,
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
        password: 'testpassword123',
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
        isValidate: false,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

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
        uniqueUrl: null,
        isPrivate: false,
        twoFactorEnabled: false,
        twoFactorSecret: null,
        createdAt: undefined,
        updatedAt: undefined,
        isValidate: false,
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
  describe('updateProfilePassword', () => {
    it('should update the password of a minter', async () => {
      const id = 1;
      const oldPassword = 'oldPassword123';
      const newPassword = 'newPassword456';

      const minter: MinterEntity = {
        id: id,
        password: await bcrypt.hash(oldPassword, 10),
        username: '',
        email: '',
        phone: '',
        bio: '',
        pictureUrl: '',
        uniqueUrl: '',
        isPrivate: false,
        isValidate: true,
        twoFactorEnabled: false,
        twoFactorSecret: '',
        createdAt: undefined,
        updatedAt: undefined,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(minter);

      const updateResult: UpdateResult = {
        raw: {},
        generatedMaps: [],
        affected: 1,
      };
      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateResult);

      await service.updateProfilePassword(id, oldPassword, newPassword);

      expect(repository.update).toHaveBeenCalledWith(
        id,
        expect.objectContaining({ password: expect.any(String) }),
      );
    });
    it('should throw error if old password is incorrect', async () => {
      const id = 1;
      const oldPassword = 'incorrectPassword';
      const newPassword = 'newPassword456';

      const minter: MinterEntity = {
        id: id,
        password: await bcrypt.hash('correctPassword', 10),
        username: '',
        email: '',
        phone: '',
        bio: '',
        pictureUrl: '',
        uniqueUrl: '',
        isPrivate: false,
        isValidate: true,
        twoFactorEnabled: false,
        twoFactorSecret: '',
        createdAt: undefined,
        updatedAt: undefined,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(minter);

      await expect(
        service.updateProfilePassword(id, oldPassword, newPassword),
      ).rejects.toThrowError('Old Password is incorrect.');
    });

    it('should throw error if new password format is invalid', async () => {
      const id = 1;
      const oldPassword = 'oldPassword123';
      const newPassword = 'short';

      const minter: MinterEntity = {
        id: id,
        password: await bcrypt.hash(oldPassword, 10),
        username: '',
        email: '',
        phone: '',
        bio: '',
        pictureUrl: '',
        uniqueUrl: '',
        isPrivate: false,
        isValidate: true,
        twoFactorEnabled: false,
        twoFactorSecret: '',
        createdAt: undefined,
        updatedAt: undefined,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(minter);

      await expect(
        service.updateProfilePassword(id, oldPassword, newPassword),
      ).rejects.toThrowError('New Password must be in valid format.');
    });
  });
  describe('getUserProfile', () => {
    describe('getUserProfile', () => {
      it('should return username and email of a minter', async () => {
        const id = 1;
        const minter: MinterEntity = {
          id: id,
          username: 'testuser',
          email: 'test@example.com',
          password: '',
          phone: '',
          bio: '',
          pictureUrl: '',
          uniqueUrl: '',
          isPrivate: false,
          isValidate: true,
          twoFactorEnabled: false,
          twoFactorSecret: '',
          createdAt: undefined,
          updatedAt: undefined,
        };

        jest.spyOn(repository, 'findOne').mockResolvedValueOnce(minter);

        const userProfile = await service.getUserProfile(id);

        expect(userProfile).toEqual({
          username: minter.username,
          email: minter.email,
        });
      });

      it('should throw error if user is not found', async () => {
        const id = 1;

        jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
        await expect(service.getUserProfile(id)).rejects.toThrowError(
          'User not found',
        );
      });
    });
  });
  describe('updateProfileEmail', () => {
    it('should update the email of a minter', async () => {
      const id = 1;
      const newEmail = 'new@example.com';

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      const updateResult: UpdateResult = {
        raw: {},
        generatedMaps: [],
        affected: 1,
      };

      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateResult);
      await service.updateProfileEmail(id, newEmail);

      expect(repository.update).toHaveBeenCalledWith(
        { id },
        { email: newEmail, isValidate: false },
      );
    });

    it('should throw error if email is already used', async () => {
      const id = 1;
      const newEmail = 'used@example.com';

      const minter: MinterEntity = {
        id: id,
        username: 'testuser',
        email: 'used@example.com',
        password: '',
        phone: '',
        bio: '',
        pictureUrl: '',
        uniqueUrl: '',
        isPrivate: false,
        isValidate: true,
        twoFactorEnabled: false,
        twoFactorSecret: '',
        createdAt: undefined,
        updatedAt: undefined,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(minter);

      await expect(
        service.updateProfileEmail(id, newEmail),
      ).rejects.toThrowError('This email is already used.');
    });

    it('should throw error if email format is invalid', async () => {
      const id = 1;
      const newEmail = 'invalidemail';

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        service.updateProfileEmail(id, newEmail),
      ).rejects.toThrowError('The email must be in valid format.');
    });
  });
});
