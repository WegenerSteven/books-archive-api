import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsUUID,
} from 'class-validator';
export class CreateUserDto {
  @IsUUID()
  @IsNumber()
  @IsNotEmpty()
  id?: number;

  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
