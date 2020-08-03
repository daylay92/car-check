/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller } from '@nestjs/common';
import { UserService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
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
    const { _id, firstName, lastName, email, isAdmin } = await this.userService.create(
      userData,
    );
    return { _id, firstName, lastName, email, isAdmin };
  }

  @GrpcMethod('UserService', 'FindUser')
  async findUser({ id }: UserId, _metadata: any): Promise<UserResponse> {
    const {
      _id,
      firstName,
      lastName,
      email,
      hash,
      isAdmin
    } = await this.userService.findById(id);
    return { _id, firstName, lastName, email, hash, isAdmin};
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
      isAdmin
    } = await this.userService.findByEmail(mail);
    return { _id, firstName, lastName, email, hash, isAdmin };
  }
}
