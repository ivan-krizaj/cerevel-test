import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TrialsModule } from './trials/trials.module';
import { SitesModule } from './sites/sites.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TrialsModule,
    AuthModule,
    SitesModule,
    UsersModule,
    PatientsModule,
  ],
})
export class AppModule {}
