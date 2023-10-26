import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './app.model';
import { SecurityModule } from 'src/security/security.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://arsalan:personal@cluster0.f15ef2d.mongodb.net/personal'), 
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    SecurityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
