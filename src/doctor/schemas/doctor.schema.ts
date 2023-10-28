import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema()
export class Doctor {
  @Prop()
  id: string;

  @Prop()
  profile: string

  @Prop()
  category: string

  @Prop()
  description: string

  @Prop()
  start: string

  @Prop()
  end: string

  @Prop()
  pendingapproval: any[]

  @Prop()
  approved: []
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);