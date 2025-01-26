import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UserHelper } from './user.helper';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { MetricsService } from 'src/metrics/metrics.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService, private readonly userHelper: UserHelper, private readonly metricsService: MetricsService) { }
  async create(createTodoDto: CreateTodoDto) {
    const { title } = createTodoDto;
    const userId = await this.userHelper.getUserId();

    const newTodo = await this.prisma.todo.create({
      data: {
        title,
        userId
      }
    }).then((todo) => {
      this.metricsService.recordSuccess();
      return todo;
    }).catch(err => {
      this.metricsService.recordFailure();
      throw new BadRequestException(err.message);
    })

    return newTodo;

  }

  async findUserTodos() {
    const userId = await this.userHelper.getUserId();

    const todos = await this.prisma.todo.findMany({
      where: {
        userId
      },

      orderBy: [
        {
          completed: 'asc'
        },
        {
          updatedAt: 'desc'
        }
      ]
    }).then(todos => {
      this.metricsService.recordSuccess();
      return todos;
    }).catch(err => {
      this.metricsService.recordFailure();
      throw new BadRequestException(err.message);
    })

    return todos;
  }

  async updateTodo({ id, ...data }: UpdateTodoDto) {
    const updated = await this.prisma.todo.update({
      where: { id },
      data
    }).then(todo => {
      this.metricsService.recordSuccess();
      return todo;
    }).catch(err => {
      this.metricsService.recordFailure();
      throw new BadRequestException(err.message);
    })

    return updated;

  }

  async deleteTodo({ id }: UpdateTodoDto) {
    const deleted = await this.prisma.todo.delete({
      where: { id }
    }).then(todo => {
      this.metricsService.recordSuccess();
      return {
        message: `Todo with title ${todo.title} has been deleted`
      }
    }).catch(err => {
      this.metricsService.recordFailure();
      throw new BadRequestException(err.message);
    })

    return deleted;
  }


  async getTodo({ id }: UpdateTodoDto) {
    const todo = await this.prisma.todo.findUnique({
      where: { id }
    }).then(todo => {
      this.metricsService.recordSuccess();
      return todo
    }).catch(err => {
      this.metricsService.recordFailure();
      throw new BadRequestException(err.message);
    })

    return todo;
  }

}
