import { Injectable } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { hash } from 'argon2';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    const { password, ...user } = createUserDto;
    const hashedPassword = await hash(password);
    return this.databaseService.user.create({
      data: { ...user, password: hashedPassword },
    });
  }

  async findAll(role?: Role): Promise<User[]> {
    if (role) {
      return this.databaseService.user.findMany({
        where: { role },
      });
    }
    return this.databaseService.user.findMany();
  }


  async findOne(id: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { id }
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { email }
    });
  }

  async update(
    id: string,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User | null> {
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<User | null> {
    return this.databaseService.user.delete({
      where: { id },
    });
  }

  async getUserPolls(id: string) {
    return this.databaseService.poll.findMany({
      where: { authorId: id },
      include: { options: true, author: true },
    });
  }
}
