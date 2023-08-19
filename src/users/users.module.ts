import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USERS_SERVICE',
        inject: [ConfigService],
        useFactory: ((configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('rabbitmq_url')],
            queue: 'users_queue',
            queueOptions: {
              durable: false
            }
          }
        }))
      }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
