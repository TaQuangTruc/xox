import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'hospital_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async create(createStaffDto: CreateStaffDto) {
    return await this.client.send('staff.create', createStaffDto);
  }

  async findAll() {
    return await this.client.send('staff.findAll', {});
  }

  async findOne(id: string) {
    return await this.client.send('staff.findOne', { id });
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    return await this.client.send('staff.update', { id, updateStaffDto });
  }

  async delete(id: string) {
    return await this.client.send('staff.delete', { id });
  }
}
