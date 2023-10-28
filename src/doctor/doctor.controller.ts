import { Get, Controller, Post, Body, Headers, BadRequestException } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorRequest } from './dto/doctor.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService, private jwtService: JwtService) { }

    @Get("getinfo")
    async getinfo(@Headers() headers) {
        try {
            const auth = headers.authorization
            const isAuth = await this.jwtService.verify(auth)
            return this.doctorService.getinfo(isAuth.id)
        } catch (error) {
            if (error.message.toLowerCase().includes("jwt malformed")) throw new BadRequestException("Invalid token")
            throw error
        }
    }

    @Post("getinfo")
    async createinfo(@Body() body: DoctorRequest, @Headers() headers) {
        try {
            const auth = headers.authorization
            const isAuth = await this.jwtService.verify(auth)
            return this.doctorService.createinfo(isAuth.id, body)
        } catch (error) {
            if (error.message.toLowerCase().includes("jwt malformed")) throw new BadRequestException("Invalid token")
            throw error
        }
    }

    @Get("allPendingReq")
    async getAllPendingApp(@Headers() headers) {
        try {
            const auth = headers.authorization
            const isAuth = await this.jwtService.verify(auth)
            return this.doctorService.getAllPendingApp(isAuth.id)
        } catch (error) {
            if (error.message.toLowerCase().includes("jwt malformed")) throw new BadRequestException("Invalid token")
            throw error
        }
    }
}
