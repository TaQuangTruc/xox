import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class PatientService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'patient_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async createPatient(patient: any) {
    return this.client.emit('patient_created', patient);
  }
}


