import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTrialDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  trialDrug?: string;

  @IsDateString()
  @IsOptional()
  start_date?: Date;

  @IsDateString()
  @IsOptional()
  end_date?: Date;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsNumber({}, { each: true })
  @IsOptional()
  sitesIds: number[];
}
