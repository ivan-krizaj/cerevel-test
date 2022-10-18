import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { appendIds } from 'utils/appendIds';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { trialsIds, sitesIds, ...result } = createUserDto;

    const sitesData = await appendIds(sitesIds);
    const trialData = await appendIds(trialsIds);

    let payload = {
      data: {
        ...result,
        sites: {
          connect: sitesData,
        },
        trials: {
          connect: trialData,
        },
      },
    };

    await this.prisma.user.create(payload);

    return {
      status: 200,
      message: 'User created successfully!',
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        sites: true,
        trials: true,
      },
    });

    if (!users) {
      throw new NotFoundException('No user found!');
    }

    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { sites: true, trials: true },
    });

    if (!user) {
      throw new NotFoundException('No user found!');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { trialsIds, sitesIds, ...result } = updateUserDto;

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
          connect: sitesData,
        },
      };
    }

    await this.prisma.user.update({ where: { id }, data: payload });

    return {
      status: 200,
      message: 'Patient updated successfully!',
    };
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    console.log('user 123:>> ', user);

    return user;
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });

    return {
      status: 200,
      message: 'Trial deleted successfully!',
    };
  }
}
