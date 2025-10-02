import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig)
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    DatabaseService,
    UsersService,
    JwtStrategy
  ],
  exports: [PassportModule, AuthModule, JwtModule]
})
export class AuthModule { }
