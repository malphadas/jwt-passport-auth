import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { verify } from 'argon2';
import { AuthJwtPayload } from './types/auth-jwtPayload';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

  // async signIn(email: string, pass: string): Promise<{ access_token: string }> {
  //   const user = await this.usersService.findByEmail(email);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { sub: user.id, email: user.email };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }

  async sugnIn(userId: string, name?: string) {
    const { accessToken } = await this.generateTokens(userId);
    return {
      id: userId,
      name: name,
      accessToken
    }
  }


  async signUp(signUpDto: Prisma.UserCreateInput) {
    const user = await this.usersService.findByEmail(signUpDto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    return await this.usersService.create(signUpDto);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: user.id, name: user.name };
  }

  async generateTokens(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload),
    ])
    return {
      accessToken
    }

  }
}
