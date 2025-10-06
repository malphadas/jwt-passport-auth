import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import refreshConfig from './config/refresh.config';
import { RefreshStrategy } from './strategies/refresh-token.strategy';
import googleOAuth from './config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';
@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
    ConfigModule.forFeature(googleOAuth),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    DatabaseService,
    UsersService,
    JwtStrategy,
    RefreshStrategy,
    GoogleStrategy
  ],
})
export class AuthModule { }
