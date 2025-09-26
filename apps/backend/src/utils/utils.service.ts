import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UtilsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async generateUniqueSlug(title: string): Promise<string> {
    let slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');

    let uniqueSlug = slug;
    let counter = 1;

    while (
      await this.databaseService.poll.findUnique({
        where: { slug: uniqueSlug },
      })
    ) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  }
}
