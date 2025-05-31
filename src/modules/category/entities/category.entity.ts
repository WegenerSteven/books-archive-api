import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
