import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    return await this.profileRepository.save(createProfileDto);
  }

  async findAll() {
    return await this.profileRepository.find();
  }

  async findOne(id: number) {
    return await this.profileRepository.findOneBy({ id: id.toString() });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    await this.profileRepository.update(id, updateProfileDto);
    return await this.profileRepository.findOneBy({ id: id.toString() });
  }

  async remove(id: number) {
    await this.profileRepository.delete(id);
    return { deleted: true };
  }
}
