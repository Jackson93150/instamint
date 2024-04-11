import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { ContentEntity } from './content.entity';
import { MinterEntity } from './minter.entity';

@Entity({ name: 'draft' })
export class DraftEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  hashtag: string;

  @Column()
  location: string;

  @ManyToOne(() => MinterEntity, (minter) => minter.drafts)
  minter: MinterEntity;

  @ManyToOne(() => ContentEntity, (content) => content.drafts)
  content: MinterEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
