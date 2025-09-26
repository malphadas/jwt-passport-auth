import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { PollsService } from './polls.service';
import { Prisma } from '@prisma/client';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get()
  findAll() {
    return this.pollsService.findAll();
  }

  @Get(':id/options')
  listOptions(@Param('id') id: string) {
    return this.pollsService.listOptions(id);
  }

  @Get(':id/tags')
  listTags(@Param('id') id: string) {
    return this.pollsService.listTags(id);
  }

  @Get('author/:authorId')
  findByAuthorId(@Param('authorId') authorId: string) {
    return this.pollsService.findByAuthorId(authorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pollsService.findOne(id);
  }

  @Post()
  create(@Body() createPollDto: Prisma.PollCreateInput) {
    return this.pollsService.create(createPollDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePollDto: Prisma.PollUpdateInput,
  ) {
    return this.pollsService.update(id, updatePollDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pollsService.remove(id);
  }
}
