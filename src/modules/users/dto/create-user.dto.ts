import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
export class CreateUserDto {
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
