import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../services/auth/auth.proto'),
          url: 'localhost:5002',
        },
      },
    ])
  ],
  controllers: [AuthController],
  exports: []
})
export class AuthModule {}

export const promisify = <T extends object>(service: T) => {
  return new Proxy(service, {
    get: (service: any, methodName: string) => {
      return async (...params) => {
        return await service[methodName](...params).toPromise()
      }
    }
  })
}