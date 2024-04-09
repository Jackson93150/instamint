import { MinterInterface } from './minter.interface';

export interface ContentInterface {
  id: number;
  name: string;
  url: string;
  type: string;
  minter: MinterInterface;
  createdAt: Date;
  updatedAt: Date;
}
