import { Controller, Get, Inject } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  ClientProxy,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // Inject rabbitmq service
    @Inject('HELLO_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  // rabbitmq controller
  @Get('health_check')
  getHello(): string {
    console.log('getHello');
    this.client.emit('health_check', 'Working app service');
    return this.appService.getHello();
  }

  // rabbitmq listner logic
  @EventPattern('health_check')
  getNotifications(data: any) {
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();

    // channel.ack(originalMsg);
    console.log(data);
    return data;
  }
}
