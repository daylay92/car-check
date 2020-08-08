import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  entry(): { message: string } {
    return {
      message: 'Welcome to car-check',
    };
  }
}
