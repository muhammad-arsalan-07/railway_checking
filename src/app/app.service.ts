import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './app.model';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}
  
  async getHello() {
    await this.catModel.create({name: "hello", age: 15, breed: "not working"})
    return 'Hello World!';
  }
}
