import { IsBoolean, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTrialDto {
  @IsString()
  name: string;

  @IsString()
  trialDrug: string;

  @IsDateString()
  start_date: Date;

  @IsDateString()
  end_date: Date;

  @IsBoolean()
  is_active: boolean;

  sitesIds: number[];
}
