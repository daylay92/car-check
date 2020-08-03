import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from './schemas/user.schema';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRootAsync({useFactory:(configService: ConfigService)=>({
    uri: configService.get('DATABASE_URL')
  }), imports: [ConfigModule], inject: [ConfigService]}), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule { }
