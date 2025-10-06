import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { verify } from 'argon2';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { ConfigType } from '@nestjs/config';
import refreshConfig from './config/refresh.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>
  ) { }

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

  async signIn(userId: string, name?: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    return {
      id: userId,
      name: name,
      accessToken,
      refreshToken,
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
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig)
    ])
    return {
      accessToken,
      refreshToken
    }
  }

  async validateJwtUser(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const currentUser = { id: user.id }
    return currentUser;
  }

  async validateRefreshToken(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const currentUser = { id: user.id }
    return currentUser;
  }

  async refreshTokens(userId: string, username: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    return {
      id: userId,
      username: username,
      accessToken,
      refreshToken,
    }
  }

  async validateGoogleUser(googleUser: Prisma.UserCreateInput) {
    const user = await this.usersService.findByEmail(googleUser.email!);
    if (user) return user;
    return await this.usersService.create(googleUser);
  }
}
