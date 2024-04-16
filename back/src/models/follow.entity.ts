import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'follow' })
export class FollowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'follower' | 'followed';

  @Column()
  accepted: boolean;

  @Column()
  minterId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
