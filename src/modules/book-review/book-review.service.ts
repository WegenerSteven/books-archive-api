import { Injectable } from '@nestjs/common';
import { CreateBookReviewDto } from './dto/create-book-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBookReviewDto } from './dto/update-book-review.dto';
import { Repository } from 'typeorm';
import { BookReview } from './entities/book-review.entity';

@Injectable()
export class BookReviewService {
  constructor(
    // Inject any necessary repositories or services here
    @InjectRepository(BookReview)
    private bookReviewRepository: Repository<BookReview>,
  ) {}
  async create(createBookReviewDto: CreateBookReviewDto) {
    const bookReview = this.bookReviewRepository.create(createBookReviewDto);
    return await this.bookReviewRepository.save(bookReview).then((review) => {
      return this.bookReviewRepository
        .findOneBy({ id: review.id })
        .catch((error) => {
          // Handle error
          console.error('Error finding the created review:', error);
        });
    });
  }

  async findAll() {
    return await this.bookReviewRepository.find();
  }

  async findOne(id: number) {
    return await this.bookReviewRepository.findOneBy({ id });
  }

  async update(id: number, updateBookReviewDto: UpdateBookReviewDto) {
    await this.bookReviewRepository.update(id, updateBookReviewDto);
    return await this.bookReviewRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.bookReviewRepository.delete(id);
    return { deleted: true };
  }
}
