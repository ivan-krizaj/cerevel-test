import { Module } from '@nestjs/common';
import { TrialsService } from './trials.service';
import { TrialsController } from './trials.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TrialsController],
  providers: [TrialsService, PrismaService],
})
export class TrialsModule {}
