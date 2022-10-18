import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdatePatientDto {
  @IsBoolean()
  @IsOptional()
  consented?: boolean;

  @IsBoolean()
  @IsOptional()
  logged_in?: boolean;

  @IsNumber()
  @IsOptional()
  login_count?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsNumber({}, { each: true })
  @IsOptional()
  trialsIds: number[];

  @IsNumber({}, { each: true })
  @IsOptional()
  sitesIds: number[];
}
