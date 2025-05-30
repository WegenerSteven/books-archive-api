import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  bookId: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  publicationYear: number;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @ManyToOne(() => Category, (category) => category.books)
  category: Category;
}
