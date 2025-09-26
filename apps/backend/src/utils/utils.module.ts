import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
