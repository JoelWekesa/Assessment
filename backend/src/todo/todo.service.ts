import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UserHelper } from './user.helper';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService, private readonly userHelper: UserHelper) { }
  async create(createTodoDto: CreateTodoDto) {
    const { title } = createTodoDto;
    const userId = await this.userHelper.getUserId();

    const newTodo = await this.prisma.todo.create({
      data: {
        title,
        userId
      }
    }).then(todo => todo).catch(err => {
      throw new BadRequestException(err.message);
    })

    return newTodo;


  }

}
