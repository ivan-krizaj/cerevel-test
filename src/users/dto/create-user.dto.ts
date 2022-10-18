import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsString()
  type: string;

  @IsEmail()
  email: string;

  @IsString()
  password?: string;

  @IsOptional()
  phone?: string;

  @IsBoolean()
  is_active: boolean;

  @IsNumber({}, { each: true })
  trialsIds: number[];

  @IsNumber({}, { each: true })
  sitesIds: number[];
}
