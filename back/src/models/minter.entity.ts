import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { ContentEntity } from './content.entity';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
