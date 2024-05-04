import { MinterInterface } from './minter.interface';
import { NftInterface } from './nft.interface';

export interface MintInterface {
  id: number;
  mint: boolean;
  minter: MinterInterface;
  nft: NftInterface;
  createdAt: Date;
  updatedAt: Date;
}
