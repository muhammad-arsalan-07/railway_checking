import { Injectable } from '@nestjs/common';
import { setTimeout } from 'timers/promises';

@Injectable()
export class AppService {
  constructor() {}
  
  async getHello() {
    // await setTimeout(5000);
    return 'Hello World!';
  }
}
