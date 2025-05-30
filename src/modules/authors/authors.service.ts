import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOneBy({ id: id.toString() });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.authorRepository.update(id, updateAuthorDto);
    return await this.authorRepository.findOneBy({ id: id.toString() });
  }

  async remove(id: number) {
    await this.authorRepository.delete(id);
    return { deleted: true };
  }
}
