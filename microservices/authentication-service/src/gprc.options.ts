import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: join(__dirname, './auth.proto'),
    url: 'localhost:5002',
  },
};

export const promisify = <T extends object>(service: T) => {
  return new Proxy(service, {
    get: <U>(service: U, methodName: string) => {
      return async (...params: any[]) => {
        return await service[methodName](...params).toPromise();
      };
    },
  });
};
