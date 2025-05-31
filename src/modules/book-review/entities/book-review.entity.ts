import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('book_reviews')
export class BookReview {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int' })
  rating: number;

  @Column('date')
  createdAt: Date;
}
