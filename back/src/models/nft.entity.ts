import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { MintEntity } from './mint.entity';
import { MinterEntity } from './minter.entity';

@Entity({ name: 'nft' })
export class NftEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  txHash: string;

  @Column()
  tokenId: number;

  @Column()
  minterAddress: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  hashtag: string;

  @Column()
  location: string;

  @Column()
  listed: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 4, nullable: true })
  price: number;

  @ManyToOne(() => MinterEntity, (minter) => minter.nft)
  minter: MinterEntity;

  @OneToMany(() => MintEntity, (mint) => mint.nft, {
    nullable: true,
  })
  @JoinColumn()
  mint: MintEntity[] | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
