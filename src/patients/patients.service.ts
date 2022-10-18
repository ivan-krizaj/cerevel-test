import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { appendIds } from 'utils/appendIds';
@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    const { trialsIds, sitesIds, ...result } = createPatientDto;

    const sitesData = await appendIds(sitesIds);
    const trialData = await appendIds(trialsIds);

    let payload = {
      data: {
        ...result,
        trials: {
          connect: trialData,
        },
        sites: {
          connect: sitesData,
        },
      },
    };

    await this.prisma.patient.create(payload);

    return {
      status: 200,
      message: 'Patient created successfully!',
    };
  }

  async findAll() {
    const patients = await this.prisma.patient.findMany({
      include: { sites: true, trials: true },
    });

    if (!patients) {
      throw new NotFoundException('No patients found!');
    }

    return patients;
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: { sites: true, trials: true },
    });

    if (!patient) {
      throw new NotFoundException('No patient found!');
    }

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const { trialsIds, sitesIds, ...result } = updatePatientDto;

    const sitesData = await appendIds(sitesIds);
    const trialData = await appendIds(trialsIds);

    let payload: any;

    if (sitesData.length === 0 && trialData.length === 0) {
      payload = {
        ...result,
      };
    } else {
      payload = {
        ...result,
        sites: {
          connect: sitesData,
        },
        trials: {
          connect: trialData,
        },
      };
    }

    await this.prisma.patient.update({ where: { id }, data: payload });

    return {
      status: 200,
      message: 'Patient updated successfully!',
    };
  }

  async remove(id: number) {
    await this.prisma.patient.delete({ where: { id } });

    return {
      status: 200,
      message: 'Patient deleted successfully!',
    };
  }
}
