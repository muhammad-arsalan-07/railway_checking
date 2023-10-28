import { Body, Controller, Post, Headers, Get, BadRequestException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { JwtService } from '@nestjs/jwt';
import { ApplyappointmentRequest } from './patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService, private jwtService: JwtService) {}

  @Post("applyappointment")
  async applyappointment(@Body() body: ApplyappointmentRequest, @Headers() headers) {
      try {
          const auth = headers.authorization
          const isAuth = await this.jwtService.verify(auth)
          return this.patientService.applyappointment(isAuth.id, body)
      } catch (error) {
          if (error.message.toLowerCase().includes("jwt malformed")) throw new BadRequestException("Invalid token")
          throw error
      }
  }

//   @Post("getinfo")
//   async createinfo(@Body() body: DoctorRequest, @Headers() headers) {
//       try {
//           const auth = headers.authorization
//           const isAuth = await this.jwtService.verify(auth)
//           return this.patientService.createinfo(isAuth.id, body)
//       } catch (error) {
//           if (error.message.toLowerCase().includes("jwt malformed")) throw new BadRequestException("Invalid token")
//           throw error
//       }
//   }
}
