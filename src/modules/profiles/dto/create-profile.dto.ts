import {
  IsOptional,
  IsString,
  IsUrl,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class CreateProfileDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  location?: string;
}
