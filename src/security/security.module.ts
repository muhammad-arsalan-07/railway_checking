import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dog, DogSchema } from './schemas/login.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name:Dog.name, schema: DogSchema }]),],
  controllers: [SecurityController],
  providers: [SecurityService],
})

export class SecurityModule {}
