import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { appendIds } from 'utils/appendIds';

@Injectable()
export class SitesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSiteDto: CreateSiteDto) {
    const { usersIds, ...result } = createSiteDto;
    const usersData = await appendIds(usersIds);

    let payload = {
      data: {
        ...result,
        users: {
          connect: usersData,
        },
      },
    };

    await this.prisma.site.create(payload);

    return {
      status: 200,
      message: 'Site created successfully!',
    };
  }

  async findAll() {
    const sites = await this.prisma.site.findMany({
      include: { trials: true, patients: true, users: true },
    });

    if (!sites) {
      throw new NotFoundException('No sites found!');
    }

    return sites;
  }

  async findOne(id: number) {
    const site = await this.prisma.site.findUnique({
      where: { id },
      include: { trials: true, patients: true, users: true },
    });

    if (!site) {
      throw new NotFoundException('No site found!');
    }

    return site;
  }

  async update(id: number, updateSiteDto: UpdateSiteDto) {
    const { usersIds, ...result } = updateSiteDto;
    const usersData = await appendIds(usersIds);

    let payload: any;

    if (usersData.length === 0) {
      payload = {
        ...result,
      };
    } else {
      payload = {
        ...result,
        users: {
          connect: usersData,
        },
      };
    }

    await this.prisma.site.update({ where: { id }, data: payload });

    return {
      status: 200,
      message: 'Site updated successfully!',
    };
  }

  async remove(id: number) {
    await this.prisma.site.delete({ where: { id } });

    return {
      status: 200,
      message: 'Site deleted successfully!',
    };
  }
}
