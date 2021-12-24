import { Controller } from '@nestjs/common';
import {
  Ctx,
  Payload,
  RmqContext,
  MessagePattern,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  // rabbitmq listner logic
  @MessagePattern('notification')
  getNotifications(
    @Payload()
    data: number[],
    @Ctx()
    context: RmqContext,
  ) {
    const parmas = data;
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
    return 'SalaBula';
  }
}
