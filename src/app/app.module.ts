import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SecurityModule } from 'src/security/security.module';
import { JwtModule } from '@nestjs/jwt';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://arsalan:personal@cluster0.f15ef2d.mongodb.net/personal'), 
    MongooseModule.forFeature(),
    JwtModule.register({
      global: true,
      secret: "docter",
    }),
    SecurityModule,
    DoctorModule,
    PatientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
