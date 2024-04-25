import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { MinterEntity } from './minter.entity';

@Entity({ name: 'follow' })
export class FollowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'follower' | 'followed';

  @Column()
  accepted: boolean;

  @ManyToOne(() => MinterEntity, (minter) => minter.nft)
  minter: MinterEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
