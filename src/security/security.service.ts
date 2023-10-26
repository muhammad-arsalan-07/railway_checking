import { Injectable } from '@nestjs/common';
import { Dog } from './schemas/login.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SecurityService {
  constructor(@InjectModel(Dog.name) private dogModel: Model<Dog>) {}
  
  async login() {
    await this.dogModel.create({name: "hello", age: 15, breed: "not working"})
    return "login route"
  }
}
