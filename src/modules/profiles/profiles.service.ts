import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

// Service to manage user profiles
@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  // Create a new profile
  async create(createProfileDto: CreateProfileDto) {
    return await this.profileRepository
      .save(createProfileDto)
      .then((profile) => {
        return profile;
      })
      .catch((error) => {
        console.error('Error creating profile:', error);
        throw new Error('Failed to create profile');
      });
  }

  // Find all profiles, optionally filtered by email
  async findAll(id?: number) {
    if (id) {
      return await this.profileRepository.find({
        where: {
          id: id,
        },
        relations: ['user'],
      });
    }
    return this.profileRepository.find({
      relations: ['student'],
    });
  }

  // Find a profile by ID
  async findOne(id: number): Promise<Profile | string> {
    return await this.profileRepository
      .findOneBy({ id })
      .then((profile) => {
        if (!profile) {
          return `Profile with id ${id} not found`;
        }
        return profile;
      })
      .catch((error) => {
        console.error('Error finding profile:', error);
        throw new Error(`Failed to find profile with id ${id}`);
      });
  }
  //update profile by ID
  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile | string> {
    await this.profileRepository.update(id, updateProfileDto);

    return await this.findOne(id);
  }

  async remove(id: number): Promise<string> {
    return await this.profileRepository
      .delete(id)
      .then((result) => {
        if (result.affected === 0) {
          return `Profile with id ${id} not found`;
        }
        return `Profile with id ${id} deleted`;
      })
      .catch((error) => {
        console.error('Error removing profile:', error);
        throw new Error(`Failed to delete profile with id ${id}`);
      });
  }
}
