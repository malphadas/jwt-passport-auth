import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PollsModule } from './polls/polls.module';
import { UtilsModule } from './utils/utils.module';
import { VotesModule } from './votes/votes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersModule, PollsModule, UtilsModule, VotesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
