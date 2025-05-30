import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(0)
  publicationYear: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsUUID()
  categoryId: string;
}
