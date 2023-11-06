import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorRequest } from './dto/doctor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from './schemas/doctor.schema';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/security/schemas/user.schema';
import { Patient } from 'src/patient/patient.schema';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>
  ) { }

  async getinfo(userid: string) {
    try {
      const find = await this.doctorModel.findOne({id: new mongoose.Types.ObjectId(userid)})
      const find2 = await this.userModel.findById(userid)
      if(find2) return {...find2.toJSON(), isProfileCompleted : true}
      if(find) return {...find.toJSON(), isProfileCompleted: true, role: find2.role}
      throw new NotFoundException("user not found")
    } catch (error) {
      throw error
    }
  }

  async createinfo(userid: string, body: DoctorRequest) {
    try {
      const info = await this.doctorModel.create({id: userid, profile: body.profile, category: body.category, description: body.description})
      return info
    } catch (error) {
      throw error
    }
  }

  async getAllPendingApp(userid: string) {
    try {
      const find = await this.doctorModel.findOne({id: userid})
      if(find) {
        const allPendingApp  = find.pendingapproval
         const data = await this.patientModel.find({id: { $in : allPendingApp}})
        return data
      }
      throw new NotFoundException("user not found")
    } catch (error) {
      throw error
    }
  }

  async alldoctor() {
    try {
      const find = await this.doctorModel.find()
      return find
    } catch (error) {
      throw error
    }
  }
}
