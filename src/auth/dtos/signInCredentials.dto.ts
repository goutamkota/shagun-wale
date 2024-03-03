import { IsBoolean, IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class SignInDto {

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(/^[6-9]\d{9}$/)
  phoneNumber?: string;

  @IsString()
  @MinLength(5)
  password: string;
}