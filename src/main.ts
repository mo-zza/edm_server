import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // rabbitmq listener
  const app = await NestFactory.createMicroservice<RmqOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://'root':'qwer1234'@localhost:5672/Hello"],
        queue: 'cats_queue',
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();

  // rabbitmq controller
  // const app = await NestFactory.create(
    // AppModule
  // )
  // await app.listen(3000);
}
bootstrap();
