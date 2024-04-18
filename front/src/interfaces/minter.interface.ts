export interface MinterInterface {
  id: number;
  username: string;
  email: string;
  password: string;
  phone?: string | null;
  bio?: string | null;
  pictureUrl?: string | null;
  bannerUrl?: string | null;
  uniqueUrl?: string | null;
  isPrivate: boolean;
  isValidate: boolean;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
