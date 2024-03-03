import { IsBoolean, IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Matches(/^[6-9]\d{9}$/)
  phoneNumber: string;

  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  middleName?: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsOptional()
  @IsString()
  productKey?: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}