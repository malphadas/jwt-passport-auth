import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig)
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    DatabaseService,
    UsersService
  ]
})
export class AuthModule { }
