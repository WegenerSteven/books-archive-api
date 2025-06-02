import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from '../profiles/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //create user
  async create(createUserDto: CreateUserDto): Promise<User> {
    //check if profile exists and if associated with a user
    const existProfile = await this.profileRepository.findOneBy({
      id: createUserDto.profileId,
    });
    if (!existProfile) {
      throw new NotFoundException(
        `Profile with ID ${createUserDto.profileId} notf= found`,
      );
    }
    return this.userRepository.save(createUserDto);
  }

  //find users by name
  async findAll(name?: string): Promise<User[] | User> {
    if (name) {
      return await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.profile', 'profile')
        .where('profile.name = :name', { name })
        .getMany();
    }
    return await this.userRepository.find({
      relations: ['profile'],
    });
  }

  //find user by id
  async findOne(id: number): Promise<User | string> {
    return await this.userRepository
      .findOne({
        where: { id },
        relations: ['profile'],
      })
      .then((user) => {
        if (!user) {
          return `No user found with id ${id}`;
        }
        return user;
      })
      .catch((error) => {
        console.error('Error finding user:', error);
        throw new Error(`Failed to find user with id ${id}`);
      });
  }

  //update user
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository
      .update(id, updateUserDto)
      .then((result) => {
        if (result.affected === 0) {
          return `No user with id ${id} found`;
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        throw new Error(`Failed to update user with id ${id}`);
      });
  }

  //remove user
  async remove(id: number): Promise<string> {
    return await this.userRepository
      .delete(id)
      .then((result) => {
        if (result.affected === 0) {
          return `user with id ${id} not found`;
        }
        return `removed user with id ${id}`;
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        throw new Error(`Failed to delete user with id ${id}`);
      });
  }
}
