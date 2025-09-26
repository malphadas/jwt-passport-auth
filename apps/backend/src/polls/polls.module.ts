import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [DatabaseModule, UtilsModule],
  controllers: [PollsController],
  providers: [PollsService],
  exports: [PollsService], // Exporting PollsService if needed in other modules
})
export class PollsModule {}
