import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import { appendIds } from 'utils/appendIds';

@Injectable()
export class TrialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrialDto: CreateTrialDto) {
    const { sitesIds, ...result } = createTrialDto;
    const sitesData = await appendIds(sitesIds);

    let payload = {
      data: {
        ...result,
        associated_sites: {
          connect: sitesData,
        },
      },
    };

    await this.prisma.trial.create(payload);

    return {
      status: 200,
      message: 'Trial created successfully!',
    };
  }

  async findAll() {
    const trials = await this.prisma.trial.findMany({
      include: {
        associated_sites: true,
      },
    });

    if (!trials) {
      throw new NotFoundException('No trials found!');
    }

    return trials;
  }

  async findOne(id: number) {
    const trial = await this.prisma.trial.findUnique({
      where: { id },
      include: { associated_sites: true },
    });

    if (!trial) {
      throw new NotFoundException('No trial found!');
    }

    return trial;
  }

  async update(id: number, updateTrialDto: UpdateTrialDto) {
    const { sitesIds, ...result } = updateTrialDto;
    const sitesData = await appendIds(sitesIds);

    let payload: any;

    if (sitesData.length === 0) {
      payload = {
        ...result,
      };
    } else {
      payload = {
        ...result,
        associated_sites: {
          connect: sitesData,
        },
      };
    }

    await this.prisma.trial.update({ where: { id }, data: payload });

    return {
      status: 200,
      message: 'Trial updated successfully!',
    };
  }

  async remove(id: number) {
    await this.prisma.trial.delete({ where: { id } });

    return {
      status: 200,
      message: 'Trial deleted successfully!',
    };
  }
}
