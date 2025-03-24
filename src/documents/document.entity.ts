import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  filePath: string;

  @ManyToOne(() => User, user => user.documents)
  uploadedBy: User;

  @CreateDateColumn()
  createdAt: Date;
}
