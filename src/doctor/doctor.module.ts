import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor, DoctorSchema } from './schemas/doctor.schema';
import { User, UserSchema } from 'src/security/schemas/user.schema';
import { Patient, PatientSchema } from 'src/patient/patient.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name:Doctor.name, schema: DoctorSchema }, { name: User.name, schema: UserSchema }, { name:Patient.name, schema: PatientSchema }, ])],
  controllers: [DoctorController],
  providers: [DoctorService],
})

export class DoctorModule {}
