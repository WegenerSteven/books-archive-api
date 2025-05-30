import { IsString, IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateBookReviewDto {
  @IsUUID()
  bookId: number;

  @IsString()
  content: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
