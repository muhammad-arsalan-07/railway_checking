import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginRequest, SignupRequest } from './dto/security.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SecurityService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) { }

  async Signup(body: SignupRequest) {
    try {
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(body.password, saltOrRounds);
      const user = await this.userModel.create({ name: body.name, email: body.email, password: hashPassword, role: body.role })
      const token = await this.jwtService.signAsync({id: user._id})
      return {
        token,
        role: body.role
      }
    } catch (error) {
      if (error.code = "E11000") throw new BadRequestException("email already exists")
      throw error
    }
  }

  async login(body: LoginRequest) {
    try {
      const find = await this.userModel.findOne({ email: body.email })
      if(find) {
        const isMatch = await bcrypt.compare(body.password, find.password);
        if(isMatch) {
          const token = await this.jwtService.signAsync({id: find._id})
          return {
            token,
            role:  find.role
          }
        }
      }
      throw new NotFoundException("user not found")
    } catch (error) {
      throw error
    }
  }
}
