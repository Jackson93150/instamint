import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { MinterEntity } from './minter.entity';
import { NftEntity } from './nft.entity';

@Entity({ name: 'transaction' })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  txHash: string;

  @Column()
  tokenId: number;

  @Column()
  from: string;

  @Column({ nullable: true })
  to: string;

  @Column()
  type: 'list' | 'buy';

  @Column({ type: 'numeric', precision: 10, scale: 4, nullable: true })
  price: number;

  @ManyToOne(() => MinterEntity, (minter) => minter.transaction)
  minter: MinterEntity;

  @ManyToOne(() => NftEntity, (nft) => nft.transaction)
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
