import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSiteDto {
  @IsString()
  name: string;

  @IsString()
  address_line1: string;

  @IsString()
  address_line2: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsNumber()
  pin_code: number;

  @IsBoolean()
  is_active: boolean;

  @IsNumber({}, { each: true })
  usersIds: number[];
}
