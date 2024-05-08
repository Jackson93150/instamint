import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { ContentEntity } from './content.entity';
import { DraftEntity } from './draft.entity';
import { FollowEntity } from './follow.entity';
import { MintEntity } from './mint.entity';
import { NftEntity } from './nft.entity';
import { TransactionEntity } from './transaction.entity';

@Entity({ name: 'minter' })
export class MinterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  pictureUrl: string;

  @Column({ nullable: true })
  bannerUrl: string;

  @Column({ nullable: true })
  uniqueUrl: string;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: false })
  isValidate: boolean;

  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ nullable: true })
  twoFactorSecret: string;

  @OneToMany(() => ContentEntity, (content) => content.minter, {
    nullable: true,
  })
  @JoinColumn()
  contents: ContentEntity[] | null;

  @OneToMany(() => DraftEntity, (draft) => draft.minter, {
    nullable: true,
  })
  @JoinColumn()
  drafts: DraftEntity[] | null;

  @OneToMany(() => NftEntity, (nft) => nft.minter, {
    nullable: true,
  })
  @JoinColumn()
  nft: NftEntity[] | null;

  @OneToMany(() => FollowEntity, (follow) => follow.minter, {
    nullable: true,
  })
  @JoinColumn()
  follow: FollowEntity[] | null;

  @OneToMany(() => MintEntity, (mint) => mint.minter, {
    nullable: true,
  })
  @JoinColumn()
  mint: MintEntity[] | null;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.minter, {
    nullable: true,
  })
  @JoinColumn()
  transaction: TransactionEntity[] | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
