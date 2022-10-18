import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSiteDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address_line1?: string;

  @IsString()
  @IsOptional()
  address_line2?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  pin_code?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsNumber({}, { each: true })
  @IsOptional()
  usersIds: number[];
}
