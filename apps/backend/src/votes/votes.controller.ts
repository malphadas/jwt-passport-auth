import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Controller('votes')
export class VotesController {
  constructor(
    private readonly votesService: VotesService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(id);
  }

  @Get('option/:optionId')
  findManyByOptionId(@Param('optionId') optionId: string) {
    return this.votesService.findManyByOptionId(optionId);
  }

  @Post()
  create(@Body() data: Prisma.VoteCreateInput) {
    return this.votesService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.VoteUpdateInput) {
    return this.votesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votesService.remove(id);
  }
}
