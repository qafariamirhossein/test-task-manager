import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

  findAll() {
    return this.taskModel.find().lean().exec();
  }

  create(createTaskDto: CreateTaskDto) {
    return this.taskModel.create(createTaskDto);
  }
}
