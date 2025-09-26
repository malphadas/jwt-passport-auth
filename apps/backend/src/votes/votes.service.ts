import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VotesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(id: string) {
    return this.databaseService.vote.findUnique({
      where: { id },
    });
  }

  async findManyByOptionId(optionId: string) {
    const votes = await this.databaseService.vote.findMany({
      where: { optionId },
    });
    return votes.length;
  }

  async create(data: Prisma.VoteCreateInput) {
    return this.databaseService.vote.create({
      data,
    });
  }

  async update(id: string, data: Prisma.VoteUpdateInput) {
    return this.databaseService.vote.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.databaseService.vote.delete({
      where: { id },
    });
  }
}
