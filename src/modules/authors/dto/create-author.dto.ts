import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAuthorDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  birthDate?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
