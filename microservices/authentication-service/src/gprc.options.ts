import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const microserviceOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(__dirname, './auth.proto'),
      url: process.env.AUTH_SERVICE_URL
    },

  };