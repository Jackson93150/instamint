import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { DraftEntity } from './draft.entity';
import { MinterEntity } from './minter.entity';

@Entity({ name: 'content' })
export class ContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  type: string;

  @ManyToOne(() => MinterEntity, (minter) => minter.contents)
  minter: MinterEntity;

  @OneToMany(() => DraftEntity, (draft) => draft.content, {
    nullable: true,
  })
  @JoinColumn()
  drafts: DraftEntity[] | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
