import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoMiddleware } from './todo.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserHelper } from './user.helper';
import { MetricsService } from 'src/metrics/metrics.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, PrismaService, UserHelper, MetricsService],
})
export class TodoModule implements NestModule {
  configure(
    consumer: MiddlewareConsumer
  ) {
    consumer.apply(TodoMiddleware).forRoutes('todo');
  }
}
