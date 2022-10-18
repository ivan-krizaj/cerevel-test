import { IsNumber, IsBoolean } from 'class-validator';

export class CreatePatientDto {
  @IsBoolean()
  consented: boolean;

  @IsBoolean()
  logged_in: boolean;

  @IsNumber()
  login_count: number;

  @IsBoolean()
  is_active: boolean;

  @IsNumber({}, { each: true })
  trialsIds: number[];

  @IsNumber({}, { each: true })
  sitesIds: number[];
}
