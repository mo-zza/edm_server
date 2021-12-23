# EDM server
use rabbitmq
## 1. Controller
### main.ts
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule
  )
  await app.listen(3000);
}
bootstrap();
```
### Controller
``` typescript
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('HELLO_SERVICE')
    private readonly client: ClientProxy,
  ) {}
  @Get('health_check')
  getHello(): string {
    this.client.emit('health_check', 'Working app service');
    return this.appService.getHello();
  }
}
```
## 2. Service Logic
### main.ts
```typescript
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
}
bootstrap();
```
### Service
```typescript
import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('HELLO_SERVICE')
    private readonly client: ClientProxy,
  ) {}
  @EventPattern('health_check')
  getNotifications(data: any) {
    return data;
  }
}
```