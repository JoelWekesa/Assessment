import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UserHelper } from './user.helper';
import { UpdateTodoDto } from './dto/update-todo.dto';

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

  async findUserTodos() {
    const userId = await this.userHelper.getUserId();

    const todos = await this.prisma.todo.findMany({
      where: {
        userId
      }
    }).then(todos => todos).catch(err => {
      throw new BadRequestException(err.message);
    })

    return todos;
  }

  async updateTodo({ id, ...data }: UpdateTodoDto) {
    const updated = await this.prisma.todo.update({
      where: { id },
      data
    }).then(todo => todo).catch(err => {
      throw new BadRequestException(err.message);
    })

    return updated;

  }

}
