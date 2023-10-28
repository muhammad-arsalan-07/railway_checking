import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from 'src/doctor/schemas/doctor.schema';
import { Patient, PatientSchema } from './patient.schema';
import { User, UserSchema } from 'src/security/schemas/user.schema';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';


@Module({
  imports: [MongooseModule.forFeature([{ name:Doctor.name, schema: DoctorSchema }, { name:Patient.name, schema: PatientSchema }, { name:User.name, schema: UserSchema }])],
  controllers: [PatientController],
  providers: [PatientService],
})

export class PatientModule {}
