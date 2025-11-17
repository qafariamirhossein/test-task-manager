import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: false })
  done: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
