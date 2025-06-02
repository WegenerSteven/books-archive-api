import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../../database/database.module';
import { Profile } from '../profiles/entities/profile.entity';
import { User } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
