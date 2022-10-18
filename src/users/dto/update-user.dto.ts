import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsNumber({}, { each: true })
  @IsOptional()
  trialsIds: any[];

  @IsNumber({}, { each: true })
  @IsOptional()
  sitesIds: number[];
}
