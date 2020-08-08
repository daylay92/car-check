/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller } from '@nestjs/common';
import { UserService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Types } from 'mongoose';
import {
  UserData,
  NewUser,
  UserId,
  UserResponse,
  UserEmail,
} from './user.interface';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}
  @GrpcMethod('UserService', 'Create')
  async create(userData: UserData, _metadata: any): Promise<NewUser> {
    const {
      _id,
      firstName,
      lastName,
      email,
      isAdmin,
      createdAt,
    } = await this.userService.create(userData);
    return {
      _id: (_id as Types.ObjectId).toHexString(),
      firstName,
      lastName,
      email,
      isAdmin,
      createdAt: createdAt.toISOString(),
    };
  }

  @GrpcMethod('UserService', 'FindUser')
  async findUser({ id }: UserId, _metadata: any): Promise<UserResponse> {
    const {
      firstName,
      lastName,
      email,
      hash,
      isAdmin,
      createdAt,
      updatedAt,
    } = await this.userService.findById(id);
    return {
      _id: id,
      firstName,
      lastName,
      email,
      hash,
      isAdmin,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  }

  @GrpcMethod('UserService', 'FindUserByEmail')
  async findUserByEmail(
    { email: mail }: UserEmail,
    _metadata: any,
  ): Promise<UserResponse> {
    const {
      _id,
      firstName,
      lastName,
      email,
      hash,
      isAdmin,
      createdAt,
      updatedAt
    } = await this.userService.findByEmail(mail);
    return {
      _id: (_id as Types.ObjectId).toHexString(),
      firstName,
      lastName,
      email,
      hash,
      isAdmin,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  }
}
