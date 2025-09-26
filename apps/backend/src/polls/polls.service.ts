import { Injectable } from '@nestjs/common';
import { Poll, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class PollsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly utilsService: UtilsService,
  ) {}

  async create(createPollDto: Prisma.PollCreateInput) {
    const { options: optionInputs, tags: tagsInput, ...rest } = createPollDto;

    const title = createPollDto?.title;
    const slug = await this.utilsService.generateUniqueSlug(title);

    // If options is expected to be an array, ensure type compatibility
    const options = Array.isArray(createPollDto.options)
      ? createPollDto.options.map((option) => ({
          ...option,
        }))
      : [];

    let tags: Prisma.TagCreateNestedManyWithoutPollsInput | undefined =
      undefined;

    if (tagsInput && 'connectOrCreate' in tagsInput) {
      tags = tagsInput as Prisma.TagCreateNestedManyWithoutPollsInput;
    } else if (Array.isArray(tagsInput)) {
      // e.g. tags: [{ name: "coding" }, { name: "web" }]
      tags = {
        connectOrCreate: tagsInput.map((t) => ({
          where: { name: t.name },
          create: { name: t.name },
        })),
      };
    }

    return this.databaseService.poll.create({
      data: {
        ...rest,
        slug,
        options: {
          create: options,
        },
        ...(tags ? { tags } : {}),
      },
    });
  }

  async findAll() {
    console.log('test');

    return this.databaseService.poll.findMany({
      include: { options: true, tags: true },
    });
  }

  async findOne(id: string) {
    return this.databaseService.poll.findUnique({
      where: { id },
      include: { options: true, tags: true },
    });
  }

  async findByAuthorId(authorId: string): Promise<Poll[] | []> {
    const polls = await this.databaseService.poll.findMany({
      where: { authorId: authorId },
      include: { options: true, tags: true },
    });
    return polls.length > 0 ? polls : [];
  }

  async update(id: string, updatePollDto: Prisma.PollUpdateInput) {
    return this.databaseService.poll.update({
      where: { id },
      data: updatePollDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.poll.delete({
      where: { id },
    });
  }

  async listOptions(id: string) {
    return this.databaseService.option.findMany({
      where: { pollId: id },
    });
  }

  async listTags(id: string) {
    return this.databaseService.tag.findMany({
      where: { polls: { some: { id } } },
    });
  }
}
