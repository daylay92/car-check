import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserService, UserResponse, UserData, NewUser } from './client/user/user.interface';
import { compare, genSaltSync, hashSync } from 'bcrypt';
import {sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IPayload } from './interfaces/auth.interface';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserService;
  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc, private configService: ConfigService) {}
  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponse | null> {
    const user = await this.userService.findUserByEmail({ email });
    if (!user) return null;
    const match = await compare(password, user.hash);
    return match ? user : null;
  }

async register(data: UserData): Promise<NewUser>{
  return this.userService.create(data);
} 

  generateToken(payload: IPayload, expiresIn  = '2h'): string {
    const SECRET = this.configService.get<string>('SECRET') || 'YDSBDSOINO';
    return sign(payload, SECRET, { expiresIn })
  }

  hashPassword(plainPassword: string): string {
    return hashSync(plainPassword, genSaltSync(10));
  }

  verifyToken(token: string) : any {
    try {
      return verify(token, this.configService.get<string>('SECRET') || 'YDSBDSOINO');
    } catch (_err) {
      return null;
    }
  }
}
