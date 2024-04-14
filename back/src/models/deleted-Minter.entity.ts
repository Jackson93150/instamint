import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'deletedMinter' })
export class DeletedMinter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  minterId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
