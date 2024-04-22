import { MinterInterface } from './minter.interface';

export interface NftInterface {
  id: number;
  txHash: string;
  tokenId: number;
  minterAddress: string;
  name: string;
  url: string;
  type: string;
  description?: string;
  hashtag?: string;
  location: string;
  listed: boolean;
  price?: number;
  minter: MinterInterface;
  createdAt: Date;
  updatedAt: Date;
}
