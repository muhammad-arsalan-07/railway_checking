import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema()
export class Patient {
  @Prop()
  id: string;

  @Prop()
  name: string

  @Prop()
  message: string
}

export const PatientSchema = SchemaFactory.createForClass(Patient);