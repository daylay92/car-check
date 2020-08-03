import { Controller } from '@nestjs/common';
import { AuthService } from './app.service';
import {
  LoginDetails,
  IsValid,
  LoginResponse,
  SignupDetails,
  TokenData,
  DecodedResponse,
} from './auth.interface';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @GrpcMethod('AuthService', 'Login')
  async login(data: LoginDetails): Promise<LoginResponse> {
    const {
      _id,
      email,
      firstName,
      lastName,
      isAdmin,
    } = await this.authService.validateUser(data.email, data.password);
    const token = this.authService.generateToken({ _id, email, isAdmin });
    return {
      _id,
      email,
      firstName,
      lastName,
      isAdmin,
      token,
    };
  }

  @GrpcMethod('AuthService', 'VerifyCredentials')
  async verifyCredentials(data: LoginDetails): Promise<IsValid> {
    const isValid = await this.authService.validateUser(
      data.email,
      data.password,
    );
    return { isValid: isValid ? true : false };
  }

  @GrpcMethod('AuthService', 'Signup')
  async signup(data: SignupDetails): Promise<LoginResponse> {
    const hash = this.authService.hashPassword(data.password);
    const user = await this.authService.register({ ...data, hash });
    const token = this.authService.generateToken({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    return { ...user, token };
  }

  @GrpcMethod('AuthService', 'VerifyLogin')
  verifyLogin({ token }: TokenData): IsValid {
    const isValid = this.authService.verifyToken(token);
    return { isValid: isValid ? true : false };
  }
  @GrpcMethod('AuthService', 'VerifyAdmin')
  verifyAdmin({ token }: TokenData): IsValid {
    const user = this.authService.verifyToken(token);
    return { isValid: user.isAdmin };
  }

  @GrpcMethod('AuthService', 'GetDecoded')
  getDecoded({ token }: TokenData): DecodedResponse {
    const {_id, email, isAdmin } = this.authService.verifyToken(token);
    return {_id, email, isAdmin }
  }
}
