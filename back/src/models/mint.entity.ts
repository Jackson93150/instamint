import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { MinterEntity } from './minter.entity';
import { NftEntity } from './nft.entity';

@Entity({ name: 'mint' })
export class MintEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mint: boolean;

  @ManyToOne(() => MinterEntity, (minter) => minter.mint)
  minter: MinterEntity;

  @ManyToOne(() => NftEntity, (nft) => nft.mint)
  nft: NftEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
