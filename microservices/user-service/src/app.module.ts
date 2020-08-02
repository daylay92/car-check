import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './schemas/user.schema';

const DATABASE_URL = new ConfigService().get<string>('DATABASE_URL');

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot(DATABASE_URL), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
