import { MinterInterface } from './minter.interface';
import { NftInterface } from './nft.interface';

export interface TransactionInterface {
  id: number;
  txHash: string;
  tokenId: number;
  from: string;
  to?: string;
  type: 'list' | 'buy';
  price?: number;
  minter: MinterInterface;
  nft: NftInterface;
  createdAt: Date;
  updatedAt: Date;
}
