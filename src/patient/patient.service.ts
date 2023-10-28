import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApplyappointmentRequest } from './patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/security/schemas/user.schema';
import { Model } from 'mongoose';
import { Patient } from './patient.schema';
import { Doctor } from 'src/doctor/schemas/doctor.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>
  ) { }

  async applyappointment(userid: string,  body: ApplyappointmentRequest) {
    try {
        const user = await this.userModel.findById(userid)
        if(!user) throw new NotFoundException("user not found")
        const info = await this.patientModel.create({id: userid, message: body.message, name: user.name})
        const info2 = await this.doctorModel.findOne({id: body.doctorid})
        if(!info2) throw new BadRequestException("patient id not found")
        info2.pendingapproval.push(body.doctorid)
        await info2.save()
        return info
    } catch (error) {
      throw error
    }
  }

  async login() {
    try {

    } catch (error) {
      throw error
    }
  }
}
